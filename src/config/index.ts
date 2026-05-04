// ─────────────────────────────────────────────────────────────
//  BluePrint Studio — Config Entry Point
//
//  Merge order: defaultConfig → industryPreset → clientOverrides
//
//  Import config anywhere with:
//    import { config } from '@/config'
// ─────────────────────────────────────────────────────────────

import type { ClientConfig } from './types';
import { defaultConfig }     from './default.config';
import { clientOverrides }   from './client.config';
import { industryPresets }   from './presets';

// ── Deep Merge Utility ───────────────────────────────────────
//
// Shallow Object.assign is NOT sufficient — nested objects like
// theme, hero, contact would be overwritten entirely, losing all
// default fields that the client override doesn't mention.
//
// This deepMerge recursively merges objects. Arrays are replaced
// (not concatenated) because services.items and testimonials.items
// should be fully overridden, not appended to.

function deepMerge<T>(target: T, ...sources: Array<Partial<T>>): T {
  const result = { ...target };

  for (const source of sources) {
    for (const key in source) {
      const val = source[key as keyof typeof source];

      if (
        val !== undefined &&
        val !== null &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        typeof result[key as keyof T] === 'object' &&
        !Array.isArray(result[key as keyof T])
      ) {
        // Both sides are plain objects — recurse
        result[key as keyof T] = deepMerge(
          result[key as keyof T] as object,
          val as object
        ) as T[keyof T];
      } else if (val !== undefined) {
        // Primitive, array, or null — direct assignment
        result[key as keyof T] = val as T[keyof T];
      }
    }
  }

  return result;
}

// ── Resolve Industry Preset ──────────────────────────────────

const industry = clientOverrides.business?.industry ?? 'general';
const preset   = industryPresets[industry] ?? {};

// ── Build Final Config ───────────────────────────────────────

export const config: ClientConfig = deepMerge(
  structuredClone(defaultConfig) as ClientConfig,
  preset as Partial<ClientConfig>,
  clientOverrides as Partial<ClientConfig>
);

// ── Named Re-exports for convenience ────────────────────────

export type { ClientConfig } from './types';
