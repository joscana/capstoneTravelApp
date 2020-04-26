import { getIndexForDay } from '../src/server/server'

describe("Function that tells the index for the daily forecast", () => {
    test("It should take daysUntilTrip and dataLength and return the index number of the forecast", () => {
        const input1 = 6;
        const input2 = 5;
        const output = 5;

        expect(getIndexForDay(input1, input2)).toEqual(output);
    });
});

