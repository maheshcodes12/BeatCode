import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEditorTheme } from "../../redux/slices/editorThemeSlice";
import { updateFont } from "../../redux/slices/fontSlice";
import { updateTabSize } from "../../redux/slices/tabSizeSlice";

const Settings = () => {
	const font = useSelector((state) => state.font?.value);
	const editorTheme = useSelector((state) => state.editorTheme?.value);
	const tabSize = useSelector((state) => state.tabSize?.value);
	const dispatch = useDispatch();
	const fontSizes = ["12px", "14px", "16px", "18px", "20px", "22px", "24px"];
	const tabSizes = [2, 4];
	const themeOptions = [
		{ value: "github", name: "GitHub" },
		{ value: "tomorrow", name: "Tomorrow" },
		{ value: "monokai", name: "Monokai" },
		{ value: "kuroir", name: "Kuroir" },
		{ value: "twilight", name: "Twilight" },
		{ value: "xcode", name: "Xcode" },
		{ value: "solarized_dark", name: "Solarized Dark" },
		{ value: "solarized_light", name: "Solarized Light" },
		{ value: "terminal", name: "Terminal" },
	];
	const [isOpen, setIsOpen] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === "font") dispatch(updateFont(value));
		if (name === "editorTheme") dispatch(updateEditorTheme(value));
		if (name === "tabSize") dispatch(updateTabSize(value));
	};

	return (
		<div className="relative">
			<button
				className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-muted transition-colors hover:bg-[#F1F2F3] hover:text-ink"
				onClick={() => setIsOpen(!isOpen)}
				title="Editor settings"
			>
				<i className="fas fa-cog text-sm"></i>
			</button>

			{isOpen && (
				<>
					<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
					<div className="absolute right-0 top-11 z-50 w-72 rounded-xl border border-border bg-surface p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
						<div className="mb-4 flex items-center justify-between">
							<div>
								<p className="text-sm font-semibold text-ink">Font size</p>
								<p className="text-xs text-ink-faint">Editor text size</p>
							</div>
							<select
								className="h-9 rounded-lg border border-border bg-bg px-2 text-sm text-ink outline-none focus:border-brand"
								name="font"
								value={font}
								onChange={handleInputChange}
							>
								{fontSizes.map((size) => (
									<option key={size} value={size}>
										{size}
									</option>
								))}
							</select>
						</div>

						<div className="mb-4 flex items-center justify-between">
							<div>
								<p className="text-sm font-semibold text-ink">Theme</p>
								<p className="text-xs text-ink-faint">Editor color theme</p>
							</div>
							<select
								className="h-9 max-w-[130px] rounded-lg border border-border bg-bg px-2 text-sm text-ink outline-none focus:border-brand"
								name="editorTheme"
								value={editorTheme}
								onChange={handleInputChange}
							>
								{themeOptions.map((theme) => (
									<option key={theme.value} value={theme.value}>
										{theme.name}
									</option>
								))}
							</select>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-semibold text-ink">Tab size</p>
								<p className="text-xs text-ink-faint">Spaces per tab</p>
							</div>
							<select
								className="h-9 rounded-lg border border-border bg-bg px-2 text-sm text-ink outline-none focus:border-brand"
								name="tabSize"
								value={tabSize}
								onChange={handleInputChange}
							>
								{tabSizes.map((size) => (
									<option key={size} value={size}>
										{size}
									</option>
								))}
							</select>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Settings;