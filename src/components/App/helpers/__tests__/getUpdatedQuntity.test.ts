import { getUpdatedQuantity } from '../getUpdatedQuantity';

describe('getUpdatedQuantity', () => {
    test('add', () => {
        expect(getUpdatedQuantity(0, 'add')).toBe(1);
        expect(getUpdatedQuantity(1, 'add')).toBe(2);
        expect(getUpdatedQuantity(2, 'add')).toBe(3);
    })


    test('remove', () => {
        expect(getUpdatedQuantity(3, 'remove')).toBe(2);
        expect(getUpdatedQuantity(2, 'remove')).toBe(1);
        expect(getUpdatedQuantity(1, 'remove')).toBe(0);
    })
});
