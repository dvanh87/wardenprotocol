package keeper

import (
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/warden/repo"

	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

type ActionKeeper struct {
	actions         repo.SeqCollection[types.Action]
	actionByAddress collections.Map[collections.Pair[sdk.AccAddress, uint64], uint64]
}

func newActionKeeper(storeService store.KVStoreService, cdc codec.BinaryCodec) ActionKeeper {
	sb := collections.NewSchemaBuilder(storeService)

	actionsStore := collections.NewMap(sb, ActionPrefix, "action", collections.Uint64Key, codec.CollValue[types.Action](cdc))
	actionsCount := collections.NewSequence(sb, types.KeyPrefix(types.ActionCountKey), "actions_count")
	actions := repo.NewSeqCollection(actionsCount, actionsStore, func(a *types.Action, u uint64) { a.Id = u })

	actionByAddress := collections.NewMap(
		sb, ActionByAddressPrefix, "action_by_address",
		collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key),
		collections.Uint64Value,
	)

	_, err := sb.Build()
	if err != nil {
		panic(fmt.Sprintf("failed to build schema: %s", err))
	}

	return ActionKeeper{
		actions:         actions,
		actionByAddress: actionByAddress,
	}
}

func (k ActionKeeper) Get(ctx sdk.Context, id uint64) (types.Action, error) {
	return k.actions.Get(ctx, id)
}

func (k ActionKeeper) Set(ctx sdk.Context, action types.Action) error {
	return k.actions.Set(ctx, action.Id, action)
}

func (k ActionKeeper) New(ctx sdk.Context, action *types.Action) (uint64, error) {
	id, err := k.actions.Append(ctx, action)
	if err != nil {
		return 0, err
	}

	for _, addr := range action.Intent.Addresses {
		key := collections.Join(sdk.MustAccAddressFromBech32(addr), id)
		if err := k.actionByAddress.Set(ctx, key, id); err != nil {
			return 0, err
		}
	}

	return id, nil
}

func (k ActionKeeper) ActionsByAddress() collections.Map[collections.Pair[sdk.AccAddress, uint64], uint64] {
	return k.actionByAddress
}

func (k ActionKeeper) Coll() repo.SeqCollection[types.Action] {
	return k.actions
}
