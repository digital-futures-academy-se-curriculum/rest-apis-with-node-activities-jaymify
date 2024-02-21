import React from 'react';
import { render, screen } from '@testing-library/react';
import DateCreated from '../Components/utils/DateCreated';

describe(`DateCreated test suite`, () => {

    const mockUpdateDateCreated = jest.fn();

    test(`updateDateCreated should return null if not supplied in props`, () => {
        expect(DateCreated.defaultProps.updateDateCreated).toBeDefined();
        expect(DateCreated.defaultProps.updateDateCreated()).toBeNull();
    });

    test(`it should call the updateDateCreatedFunction when the date changes`, () => {
        render(<DateCreated updateDateCreated={mockUpdateDateCreated} />);
        expect(mockUpdateDateCreated).toHaveBeenCalledTimes(1);
    });

    test(`it should initially render with the date supplied by props`, () => {
        let testDate = new Date(`01/01/1975 12:45:52`);
        let testOutput = `${testDate.toLocaleDateString()} @ ${testDate.toLocaleTimeString()}`;
        render(<DateCreated updateDateCreated={mockUpdateDateCreated} dateCreated={testDate} />);

        expect(screen.queryByTestId(`dateCreated`).textContent.trim()).toBe(testOutput);
    });

    test(`it should call the timer on initial render if no date is supplied`, async () => {
        const setInterval = jest.spyOn(window, `setInterval`);

        render(<DateCreated updateDateCreated={mockUpdateDateCreated} />);

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    });

});