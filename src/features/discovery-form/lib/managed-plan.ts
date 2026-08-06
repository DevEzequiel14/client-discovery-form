import type { AssetsData } from '../types/form';
import { ASSET_KEYS } from '../types/steps';

/**
 * Heuristic for recommending a managed/content-heavy plan.
 * Used for soft UX guidance, not hard routing.
 */
export function isManagedPlanLikely(data: Partial<AssetsData>): boolean {
  if (data.needsContentHelp === 'yes') return true;

  const readinessValues = ASSET_KEYS.map((key) => data[key]).filter(Boolean);
  if (readinessValues.length === 0) return false;

  const noneCount = readinessValues.filter((value) => value === 'none').length;
  if (noneCount >= 3) return true;

  const missingCore =
    data.logo === 'none' && data.photos === 'none' && data.texts === 'none';
  if (missingCore) return true;

  const missingBrandSystem =
    data.logo !== 'ready' &&
    data.visualIdentity === 'none' &&
    data.brandManual === 'none';
  if (missingBrandSystem) return true;

  return false;
}
