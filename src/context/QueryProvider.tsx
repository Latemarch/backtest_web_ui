"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: React.PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 0 } },
		})
	);

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
