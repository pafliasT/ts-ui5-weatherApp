import { InputBase$ChangeEvent } from "sap/m/InputBase";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import * as Nominatim from "nominatim-client";
import MessageBox from "sap/m/MessageBox";
import Input from "sap/m/Input";
import BusyIndicator from "sap/ui/core/BusyIndicator";

type WeatherInfo = {
	current_weather: {
		temperature: number;
		windspeed: number;
		winddirection: number;
	};
	placeName: string;
};

/**
 * @namespace com.myorg.myapp.controller
 */
export default class Main extends BaseController {
	onInit(): void {
		const model = new JSONModel();
		this.setModel(model);
		void this.loadWeatherData();

		// const input = this.byId("location");
		// if (input.isA<Input>("sap.m.Input")) {   // type guard
		// 	input.attachChange((evt) => {        // now TS knows tha is an Input
		// 		const location = evt.getParameter("value");
		// 	});
		// }
	}

	async loadWeatherData(lat = "37.96", lon = "23.70", placeName = "Kallithea") {
		BusyIndicator.show(0);
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
		);
		const jsonData = (await response.json()) as WeatherInfo;
		jsonData.placeName = placeName;
		(this.getModel() as JSONModel).setData(jsonData);
		BusyIndicator.hide();
	}

	locationChange(evt: InputBase$ChangeEvent) {
		const location = evt.getParameters().value;

		Nominatim.createClient({
			useragent: "UI5 TypeScript Tutorial App", // useragent and referrer required 
			referer: "https://localhost",
		})
			.search({ q: location })
			.then((results) => {
				if (results.length > 0) {
					return this.loadWeatherData(
						results[0].lat,
						results[0].lon,
						results[0].display_name
					); // for simplicity use the first/best match
				} else {
					MessageBox.alert(`Location ${location} not found`, {
						actions: MessageBox.Action.CLOSE, // enums are now properties on the default export!
					});
				}
			})
			.catch(() => {
				MessageBox.alert(`Failure while searching ${location}`, {
					actions: MessageBox.Action.CLOSE, 
				});
			});
	}

	async onRefreshPress() {
		const location = this.byId("location") as Input;
		location.setValue("");
		await this.loadWeatherData();
	}
}
