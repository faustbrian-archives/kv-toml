// tslint:disable: no-unsafe-any
import { JsonMap, parse, stringify } from "@iarna/toml";
import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import { readFileSync, writeFileSync } from "fs-extra";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	// @ts-ignore
	protected dump(rows: Record<K, T>): void {
		writeFileSync(this.uri, stringify((rows as unknown) as JsonMap));
	}

	protected load(): void {
		for (const [key, value] of Object.entries(parse(readFileSync(this.uri, "utf8")))) {
			// @ts-ignore
			this.put(key, value);
		}
	}
}
