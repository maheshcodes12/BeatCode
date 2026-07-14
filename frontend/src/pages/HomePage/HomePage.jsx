import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const testRows = [
	{ delay: "1.6s", label: "Test 1 — [2,7,11,15], target 9 → [0,1]" },
	{ delay: "2.1s", label: "Test 2 — [3,2,4], target 6 → [1,2]" },
	{ delay: "2.6s", label: "Test 3 — [3,3], target 6 → [0,1] · 3 / 3 passed" },
];

function HomePage() {
	return (
		<div className="min-h-screen w-full bg-bg">
			<Header />

			<section className="mx-auto max-w-[1380px] px-6 py-16 lg:py-24">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
					<div>
						<div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 font-mono text-[15px] font-medium text-brand">
							<span className="h-1.5 w-1.5 rounded-full bg-brand" /> C · C++ · Java · Python
						</div>
						<h1 className="font-display text-[42px] font-bold leading-[1.08] text-ink sm:text-[52px]">
							Practice code.
							<br />
							Run it for <span className="text-brand">real</span>.
						</h1>
						<p className="mb-8 mt-5 max-w-[460px] text-[20px] leading-relaxed text-ink-muted">
							Solve algorithm problems, run code in isolated containers, and pair up in a live room with
							a friend — no setup, no signup friction.
						</p>
						<div className="mb-10 flex flex-wrap gap-3">
							<Link
								to="/practiceproblems"
								className="rounded-[9px] bg-brand px-6 py-3 text-[20px] font-semibold text-white transition-colors hover:bg-brand-hover"
							>
								Start solving →
							</Link>
							<Link
								to="/onlinecompiler"
								className="rounded-[9px] border border-border px-6 py-3 text-[20px] font-semibold text-ink transition-colors hover:bg-[#F1F2F3]"
							>
								Open compiler
							</Link>
						</div>
						<div className="flex gap-8">
							<div>
								<div className="font-display text-[30px] font-bold text-ink">120+</div>
								<div className="mt-0.5 text-[17px] text-ink-faint">Problems</div>
							</div>
							<div>
								<div className="font-display text-[30px] font-bold text-ink">4</div>
								<div className="mt-0.5 text-[17px] text-ink-faint">Languages</div>
							</div>
							<div>
								<div className="font-display text-[30px] font-bold text-ink">Live</div>
								<div className="mt-0.5 text-[17px] text-ink-faint">Code rooms</div>
							</div>
						</div>
					</div>

					{/* Signature element: live-running terminal */}
					<div className="overflow-hidden rounded-2xl border border-code-border bg-code-bg shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
						<div className="flex items-center gap-2 border-b border-code-border px-4 py-3">
							<span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
							<span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
							<span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
							<span className="ml-2 font-mono text-md text-ink-faint">two_sum.py</span>
						</div>
						<div className="px-[22px] py-5 font-mono text-[17px] leading-[1.75] text-code-text">
							<div>
								<span className="inline-block w-5 text-[#4A4F57]">1</span>
								<span className="text-[#C792EA]">def</span> <span className="text-[#82AAFF]">two_sum</span>
								(nums, target):
							</div>
							<div>
								<span className="inline-block w-5 text-[#4A4F57]">2</span>seen = {"{}"}
							</div>
							<div>
								<span className="inline-block w-5 text-[#4A4F57]">3</span>
								<span className="text-[#C792EA]">for</span> i, n <span className="text-[#C792EA]">in</span> enumerate(nums):
							</div>
							<div>
								<span className="inline-block w-5 text-[#4A4F57]">4</span>
								&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#C792EA]">if</span> target - n{" "}
								<span className="text-[#C792EA]">in</span> seen:
							</div>
							<div>
								<span className="inline-block w-5 text-[#4A4F57]">5</span>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<span className="text-[#C792EA]">return</span> [seen[target-n], i]
							</div>
							<div>
								<span className="inline-block w-5 text-[#4A4F57]">6</span>
								&nbsp;&nbsp;&nbsp;&nbsp;seen[n] = i
								<span className="ml-0.5 inline-block h-[15px] w-[7px] animate-blink align-middle bg-code-text" />
							</div>
						</div>
						<div className="border-t border-code-border px-[22px] py-3.5">
							{testRows.map((row) => (
								<div
									key={row.label}
									className="flex animate-reveal items-center gap-2.5 py-1.5 font-mono text-[15px] text-ink-faint opacity-0"
									style={{ animationDelay: row.delay }}
								>
									<span className="flex h-[15px] w-[15px] flex-shrink-0 items-center justify-center rounded-full bg-[#12351F] text-[10px] text-[#3DDC8A]">
										✓
									</span>
									{row.label}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-[1380px] px-6 py-16">
				<div className="mb-12 max-w-[560px]">
					<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 font-mono text-[20px] font-medium text-brand">
						<span className="h-1.5 w-1.5 rounded-full bg-brand" /> What you get
					</div>
					<h2 className="font-display text-[35px] font-bold text-ink">Three ways to write code here</h2>
					<p className="mt-3 text-[20px] leading-relaxed text-ink-muted">
						Each one runs the exact same way — real compilers, isolated Docker containers, instant output.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-3">
					<div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
						<span className="font-mono text-[15px] font-medium uppercase tracking-wider text-ink-faint">
							01 · Practice
						</span>
						<h3 className="font-display text-2xl text-ink">Practice Problems</h3>
						<p className="text-sm leading-relaxed text-ink-muted">
							Structured problems with example cases, difficulty ratings, and instant test feedback.
						</p>
						<div className="rounded-lg border border-border bg-[#FBFBFB] p-3.5 font-mono text-[15px]">
							<div className="flex items-center justify-between py-1.5">
								<span>Two Sum</span>
								<span className="rounded-full bg-[#E6F6EF] px-[7px] py-0.5 text-[10px] font-semibold text-easy">
									Easy
								</span>
							</div>
							<div className="flex items-center justify-between border-t border-dashed border-border py-1.5">
								<span>Container With Water</span>
								<span className="rounded-full bg-[#FBF1E1] px-[7px] py-0.5 text-[10px] font-semibold text-medium">
									Medium
								</span>
							</div>
							<div className="flex items-center justify-between border-t border-dashed border-border py-1.5">
								<span>Merge K Lists</span>
								<span className="rounded-full bg-[#FBEAEA] px-[7px] py-0.5 text-[10px] font-semibold text-hard">
									Hard
								</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
						<span className="font-mono text-[15px] font-medium uppercase tracking-wider text-ink-faint">
							02 · Compiler
						</span>
						<h3 className="font-display text-2xl text-ink">Online Compiler</h3>
						<p className="text-sm leading-relaxed text-ink-muted">
							Write and run any snippet with custom input — no problem attached, just a scratchpad.
						</p>
						<div className="rounded-lg border border-border bg-[#FBFBFB] p-3.5 font-mono text-[15px] text-ink-muted">
							<div className="py-0.5">$ gcc main.c -o run &amp;&amp; ./run</div>
							<div className="py-0.5 text-easy">&gt; Hello, World!</div>
							<div className="py-0.5 text-ink-faint">exit code 0 · 0.14s</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
						<span className="font-mono text-[15px] font-medium uppercase tracking-wider text-ink-faint">
							03 · Collaborate
						</span>
						<h3 className="font-display text-2xl text-ink">Code Room</h3>
						<p className="text-md leading-relaxed text-ink-muted">
							Share a room ID, code together in real time, and hop on a video call — like a live interview.
						</p>
						<div className="rounded-lg border border-border bg-[#FBFBFB] p-3.5 font-mono text-[15px]">
							<div className="flex items-center justify-between">
								<div className="flex">
									<span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-surface bg-brand text-[10px] font-bold text-white">
										A
									</span>
									<span className="-ml-2 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-surface bg-medium text-[10px] font-bold text-white">
										M
									</span>
								</div>
								<span className="text-ink-faint">room #k3f9a2 · 2 online</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="border-y border-border">
				<div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-7">
					<span className="font-mono text-[17px] font-medium text-ink-faint">
						RUNS ON REAL, ISOLATED DOCKER CONTAINERS
					</span>
					<div className="flex gap-9 font-mono text-md font-medium text-ink-muted">
						<span>C</span>
						<span>C++</span>
						<span>Java</span>
						<span>Python</span>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default HomePage;