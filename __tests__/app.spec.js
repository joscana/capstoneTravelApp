import { daysBetween } from '../src/client/js/app'

describe("Function that tells days between two dates", () => {
    test("It should take two dates and return the number of days between them", () => {
        const input1 = '04/26/2020';
        const input2 = '04/30/2020';
        const output = 4;

        expect(daysBetween(input1, input2)).toEqual(output);
    });
});

