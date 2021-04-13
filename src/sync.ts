import { JsonMap, parse, stringify } from "@iarna/toml";
import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import { ensureFileSync, readFileSync, writeFileSync } from "fs-extra";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	protected dump(): void {
		writeFileSync(this.uri, stringify((this.store as unknown) as JsonMap));
	}

	protected load(): void {
		ensureFileSync(this.uri);

		try {
			for (const [key, value] of Object.entries(
				parse(readFileSync(this.uri, "utf8"))
			)) {
				// @ts-ignore
				this.put(key, value);
			}
		} catch {
			//
		}
	}
}
