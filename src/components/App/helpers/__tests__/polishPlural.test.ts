import { polishPlural } from '../polishPlural';

describe('polishPlural', () => {
    test('correct word inflection', () => {
        expect(polishPlural('sztukę', 'sztuki', 'sztuk', 0)).toBe('sztuk');
        expect(polishPlural('sztukę', 'sztuki', 'sztuk', 1)).toBe('sztukę');
        expect(polishPlural('sztukę', 'sztuki', 'sztuk', 5)).toBe('sztuk');
        expect(polishPlural('sztukę', 'sztuki', 'sztuk', 23)).toBe('sztuki');
        expect(polishPlural('sztukę', 'sztuki', 'sztuk', 122)).toBe('sztuki');
    })
});
