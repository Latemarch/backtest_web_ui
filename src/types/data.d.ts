type KlineData = {
	startTime: string;
	openPrice: string;
	highPrice: string;
	lowPrice: string;
	closePrice: string;
	volume: string;
	turnover: string;
};

type ResponseResult = {
	symbol: string;
	category: string;
	list: KlineData[];
};

type ApiResponse = {
	retCode: number;
	retMsg: string;
	result: ResponseResult;
	retExtInfo: Record<string, unknown>;
	time: number;
};

type Trades = {
	topic: string;
	type: string;
	ts: number;
	data: Array<{
		T: number;
		s: string;
		S: string;
		v: string;
		p: string;
		L: string;
		i: string;
		BT: boolean;
	}>;
};

type historyKlineData = number[][];
type historyKline = {
	id: number;
	createdAt: Date;
	name: string;
	data: historyKlineData;
	timeOpen: string;
	timeClose: string;
};
