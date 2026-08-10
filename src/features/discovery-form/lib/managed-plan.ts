import type { AssetsData } from '../types/form';

/**
 * Heuristic for recommending a managed/content-heavy plan.
 * Used for soft UX guidance, not hard routing.
 */
export function isManagedPlanLikely(data: Partial<AssetsData>): boolean {
  if (data.needsContentHelp === 'yes') return true;

  const missingCore =
    data.logo === 'no' && data.photos === 'none' && data.texts === 'none';
  if (missingCore) return true;

  const thinMaterials =
    (data.photos === 'none' || data.photos === 'some') &&
    (data.texts === 'none' || data.texts === 'some') &&
    data.visualIdentity === 'none' &&
    data.logo === 'no';
  if (thinMaterials) return true;

  return false;
}
