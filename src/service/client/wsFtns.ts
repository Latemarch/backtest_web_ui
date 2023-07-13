import { w3cwebsocket as WebSocket } from "websocket";

const CLIENT = new WebSocket("wss://stream-testnet.bybit.com/v5/public/spot");

export function streamTrade(callback: any) {
	CLIENT.onopen = () => {
		console.log("WebSocket Client Connected");
		CLIENT.send(
			JSON.stringify({
				op: "subscribe",
				args: ["publicTrade.BTCUSDT"],
			})
		);
	};

	CLIENT.onmessage = (message) => {
		if (typeof message.data === "string") {
			const data = JSON.parse(message.data);
			if (data.topic === "publicTrade.BTCUSDT" && data.type === "snapshot") {
				callback(data);
			}
		}
	};

	return () => {
		CLIENT.close();
	};
}

export function streamKline(
	symbol: string,
	interval: string,
	callback: (data: any) => void
) {
	const topic = `kline.${interval}.${symbol}`;
	const CLIENT = new WebSocket("wss://stream.bybit.com/realtime");

	CLIENT.onopen = () => {
		console.log("WebSocket Client Connected");
		CLIENT.send(
			JSON.stringify({
				op: "subscribe",
				args: [topic],
			})
		);
	};

	CLIENT.onmessage = (message) => {
		if (typeof message.data === "string") {
			const data = JSON.parse(message.data);
			if (data.topic === topic && data.type === "snapshot") {
				callback(data.data);
			}
		}
	};

	return () => {
		CLIENT.close();
	};
}
