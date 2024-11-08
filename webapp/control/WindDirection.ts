import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import type { MetadataOptions } from "sap/ui/core/Element";

/**
 * @namespace com.myorg.myapp.control
 */
export default class WindDirection extends Control {
	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(idOrSettings?: string | $WindDirectionSettings);
	constructor(id?: string, settings?: $WindDirectionSettings);
	constructor(id?: string, settings?: $WindDirectionSettings) {
		super(id, settings);
	}
	static readonly metadata: MetadataOptions = {
		properties: {
			/**
			 * The direction in degrees FROM which the wind blows (this is the internationally common definition).
			 *  Value 0 means: wind blows from North to South.
			 *  Value 90 means: wind blows from East to West.
			 *  Value 180 means: wind blows from South to North.
			 *  Value 270 means: wind blows from West to East.
			 */
			direction: "float",
		},
	};

	renderer = {
		apiVersion: 2,
		render: (rm: RenderManager, control: WindDirection) => {
			rm.openStart("div", control);
			rm.openStart("div", control);
			rm.openEnd();
			rm.style("font-size", "2rem");
			rm.style("width", "2rem");
			rm.style("height", "2rem");
			rm.style("display", "inline-block");
			rm.style("color", "black");
			rm.style("vertical-align", "middle"); // Ensure it's aligned with text and icons
			rm.style("text-align", "center"); // Center the arrow within the div
			rm.style("transform-origin", "center");
			rm.style("transform", `rotate(${control.getDirection() + 90}deg)`);
			rm.openEnd();
			rm.text("➢");
			rm.close("div");
			rm.close("div");
		},
	};
}
