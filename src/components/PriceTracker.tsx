"use client";
import { streamTrade } from "@/service/client/wsFtns";
import React, { useEffect, useState } from "react";

function TradeComponent() {
	const [trades, setTrades] = useState<Trades | undefined>();

	useEffect(() => {
		streamTrade(setTrades);
	}, []);

	return (
		<div>
			{trades &&
				trades.data.map((item, idx) => (
					<div key={idx}>
						<p>Timestamp: {item.T}</p>
						<p>Symbol: {item.s}</p>
						<p>Side of Taker: {item.S}</p>
						<p>Trade Size: {item.v}</p>
						<p>Trade Price: {item.p}</p>
						<p>Direction of Price Change: {item.L}</p>
						<p>Trade ID: {item.i}</p>
						<p>Block Trade Order: {item.BT ? "Yes" : "No"}</p>
					</div>
				))}
		</div>
	);
}

export default TradeComponent;
