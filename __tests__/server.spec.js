import { getIndexForDay } from '../src/server/server'

describe("Function that tells the index for the daily forecast", () => {
    test("It should take daysUntilTrip and dataLength and return the index number of the forecast", () => {
        let daysUntilTrip = 6;
        let dataLength = 5;
        let output = 4;
        expect(getIndexForDay(daysUntilTrip, dataLength)).toEqual(output);

        daysUntilTrip = 3;
        dataLength = 5;
        output = 3;
        expect(getIndexForDay(daysUntilTrip, dataLength)).toEqual(output);

    });
});

