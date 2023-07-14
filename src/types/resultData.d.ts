type Store = {
	history: BackTestHistory;
};
type TradeDetails = {
	time: Date;
	price: number;
};

type TradeHistory = {
	buy: TradeDetails;
	sell?: TradeDetails & {
		profitCut: boolean;
		lossCut: boolean;
	};
	profit?: number;
};

type BackTestHistory = {
	profitNet: number;
	profitLong: number;
	profitShort: number;
	history: { long: TradeHistory[]; short: TradeHistory[] };
};

type Trade = {
	position: "long" | "short";
	time: Date;
	price: number;
	profitCut?: boolean;
	lossCut?: boolean;
};
