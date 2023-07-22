export default function Paper() {
	return (
		<div className="flex flex-col items-center  justify-center">
			<div className="flex flex-col items-center max-w-4xl">
				<h1 className="text-2xl text-center p-8">
					Client-side rendering(CSR)과 Server-side rendering(SSR), 그리고
					Next.js의 개발 솔루션으로써의 가치
				</h1>
				<span>nextjs, tailwindcss, vercel</span>
				<span className="text-justify p-8">
					Next.js는 효율적인 웹 애플리케이션을 구축하기 위한 강력한 React
					프레임워크다. 성능 최적화와 검색 엔진 가시성 향상을 위해 서버 사이드
					렌더링(SSR)과 정적 사이트 생성(SSG)과 같은 기능을 제공한다. 자동 코드
					분할과 내장된 라우팅을 통해 Next.js는 더 빠른 페이지 로드와 간결한
					탐색을 보장한다. 또한 CSS-in-JS, API 라우트를 지원하며, Fast Refresh를
					제공하여 원활한 개발 경험을 제공한다. Next.js는 활발한 생태계와
					확장성을 자랑하며, 고성능 웹 개발 솔루션을 찾는 개발자들에게 최상의
					선택이다.
				</span>
				<div className="text-justify sm:columns-2">
					<h2 className="flex justify-center font-bold p-4 ">
						I. Introduction
					</h2>
					<span>
						웹 렌더링의 역사는 다양한 시대와 테크놀로지의 변화와 함께
						진화해왔다. 초기 웹 사이트는 정적 사이트로, HTML 파일로 이루어진
						단순한 웹페이지였다. 클라이언트는 서버로부터 이 HTML 파일을 받아 웹
						브라우저에서 표시했다. 이 단계에서는 JavaScript의 사용이 거의
						없었으며, 사용자와의 상호작용은 매우 제한적이었다. 그러나 웹이
						복잡해지고 상호작용이 중요해지면서 JavaScript를 통한 클라이언트
						사이드 렌더링(CSR)이 등장했다. CSR은 브라우저가 JavaScript를
						로드하고 실행하여 동적인 웹페이지를 생성하게 하는 방식이다. 이
						방식은 상호작용이 많은 웹 애플리케이션에 적합하였으나, 초기 로딩
						시간이 오래 걸리고 SEO 문제가 있었다. 이러한 단점을 해결하기 위해
						서버 사이드 렌더링(SSR)이 다시 주목받게 되었다. SSR은 서버에서
						페이지를 렌더링하고 완전히 렌더링된 HTML을 클라이언트에게 전송하는
						방식이다. 이 방식은 초기 페이지 로드 시간을 줄이고 SEO를
						개선하였지만, 서버 부하와 사용자가 많을 경우 성능 이슈를 겪을 수
						있다는 단점이 있다. 최근에는 이러한 이슈를 해결하기 위해 정적 사이트
						생성(SSG) 방식이 다시 부각되고 있다. SSG는 빌드 시점에 모든 페이지를
						미리 렌더링하여 정적 파일로 생성한다. 이렇게 생성된 파일은 CDN에
						배포되어 빠른 로드 시간과 높은 성능을 제공한다.
						<br />
						Next.js는 위에서 언급한 웹 렌더링 방식들의 장점들을 최대한 살리는
						프레임워크다. 초기의 정적 웹 사이트에서 복잡한 웹 애플리케이션으로
						넘어오면서 발생한 동적 렌더링에 대한 필요성을 Next.js는 클라이언트
						사이드 렌더링(CSR)으로 해결한다. Next.js 애플리케이션은 React를
						기반으로 하므로, React의 컴포넌트 기반 아키텍처와 생태계를 이용해
						풍부한 사용자 인터페이스와 상호작용을 구현할 수 있다. 하지만
						CSR만으로는 SEO 최적화와 초기 로딩 속도에 있어서의 문제점을 완전히
						해결하기 어렵다. 이러한 문제점을 해결하기 위해 Next.js는 서버 사이드
						렌더링(SSR)을 제공한다. Next.js의 SSR 기능은 각 페이지 요청 시
						서버에서 HTML을 렌더링하고, 브라우저로 전송하여 초기 로딩 시간을
						단축시키며, 더 나은 SEO 성능을 제공한다. 더 나아가, Next.js는 정적
						사이트 생성(Static Site Generation, SSG) 기능을 제공하여 빌드 시간에
						페이지를 미리 렌더링하고, 이를 정적 파일로 제공한다. 이로써 서버
						부하를 줄이면서 빠른 응답 시간을 제공할 수 있으며, 이는 매우
						효과적인 방법으로서 대용량 트래픽에 대응할 수 있게 한다.
					</span>
					<h2 className="flex justify-center font-bold p-4 ">II. Routing</h2>
					<span>
						Next.js utilizes a file-system based router, allowing developers to
						define routes based on the file structure of their application.
						Dynamic routes are supported using the brackets syntax ([param]),
						enabling the creation of routes with dynamic segments for handling
						various parameters and generating dynamic pages based on the URL.
						Nested routing is also supported in Next.js, allowing for the
						organization of complex application layouts and managing nested
						components. For navigation between pages, Next.js offers the Link
						component, facilitating declarative navigation without full-page
						reloads. Query parameters and data can be passed through the Link
						component. Programmatic navigation and route manipulation can be
						achieved using the useRouter hook, providing access to the Next.js
						router instance. Data fetching in Next.js routes can be performed
						using the getStaticProps and getServerSideProps functions, enabling
						pre-rendering and data fetching during the build process or on each
						request.
					</span>
					<h2 className="flex justify-center font-bold p-4 ">III. Rendering</h2>
					<span>
						Next.js offers versatile rendering options, including client-side
						rendering (CSR), server-side rendering (SSR), and static site
						generation (SSG), catering to various use cases and optimizing
						performance. Client-side rendering (CSR) is the default rendering
						method in Next.js, where the initial rendering occurs on the
						client-side using JavaScript. This approach is ideal for dynamic
						content and interactive components that rely on client-side data
						fetching and manipulation. Server-side rendering (SSR) is a powerful
						feature of Next.js that allows rendering React components on the
						server-side. SSR enhances initial page load times, improves search
						engine visibility, and ensures fast content delivery to users.
						Next.js seamlessly handles server-side rendering, enabling
						developers to focus on building robust applications. Static site
						generation (SSG) generates fully pre-rendered HTML pages at build
						time, providing exceptional performance and reducing server load.
						SSG is ideal for content-driven websites that dont require real-time
						data updates. Next.js offers flexible data fetching methods,
						enabling developers to fetch and pre-render data during the build
						process. The Next.js documentation delves into key concepts and
						features of each rendering method, showcasing how to utilize them
						effectively based on project requirements. Furthermore, Next.js
						allows you to combine rendering methods to create hybrid
						applications. By selectively choosing between CSR, SSR, and SSG,
						developers can optimize their applications for performance,
						interactivity, and search engine optimization.
					</span>
				</div>
				<p className="p-8">1</p>
			</div>
		</div>
	);
}
