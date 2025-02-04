import HomeApps from "@/components/home-apps";
import { useSpaceId } from "@/hooks/useSpaceId";
import NoActiveSpace from "@/components/no-active-space";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import useWardenIntent from "@/hooks/useWardenIntent";
import { ActionStatus } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/rest";
import HomeAssets from "@/components/home-assets";
import TotalAssetValue from "@/components/total-asset-value";

import { useCurrency } from "@/hooks/useCurrency";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function Home() {
	const { spaceId } = useSpaceId();
	const { currency, setCurrency } = useCurrency();

	const { address } = useAddressContext();
	const { QueryActionsByAddress } = useWardenIntent();
	const q = QueryActionsByAddress(
		{
			address,
			status: ActionStatus.ACTION_STATUS_PENDING,
			"pagination.reverse": true,
		},
		{},
		100
	);

	if (!spaceId) {
		return <NoActiveSpace />;
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<TotalAssetValue />
				<div>
					<Select value={currency} onValueChange={setCurrency}>
						<SelectTrigger className="w-[100px]">
							<SelectValue placeholder="Currency" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="usd">USD</SelectItem>
								<SelectItem value="eur">EUR</SelectItem>
								<SelectItem value="gbp">GBP</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<div className="flex flex-col space-y-2">
					<span className="font-bold">Assets</span>
					<div className="border rounded-xl bg-card w-full max-h-80 flex flex-col overflow-scroll no-scrollbar">
						<HomeAssets />
					</div>
				</div>
				<div className="flex flex-col space-y-2">
					<span className="font-bold">Pending actions</span>
					<div className="border rounded-xl bg-card w-full h-full max-h-80 p-6 flex flex-col space-y-2 items-center place-content-center">
						<span className="text-muted-foreground">
							Section coming soon
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-2">
				<span className="font-bold">Top dApps</span>
				<HomeApps />
			</div>
		</div>
	);
}

export default Home;
