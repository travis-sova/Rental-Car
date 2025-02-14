const rental = require('./rentalPrice');

describe('Car Rental Price Calculation', () => {
    test('should not allow rental for drivers with a license less than a year', () => {
        const price = rental.price(Date.parse("2024-02-12"), Date.parse("2024-02-14"), "Compact", 17, 0);
        expect(price).toBe("Driver too young - cannot quote the price");
    });

    test('should not allow rental for drivers with a license less than a year', () => {
        const price = rental.price(Date.parse("2024-02-12"), Date.parse("2024-02-14"), "Compact", 25, 0);
        expect(price).toBe("Driver must hold a license for at least a year");
    });

    test('should not allow rental for drivers with a license less than a year', () => {
        const price = rental.price(Date.parse("2024-02-12"), Date.parse("2024-02-14"), "cabrio", 21, 1);
        expect(price).toBe("Drivers 21 y/o or less can only rent Compact vehicles");
    });

    test('50-year-old driver rents a car for Monday, Tuesday, Wednesday', () => {
        const price = rental.price(Date.parse("2025-02-10"), Date.parse("2025-02-12"), "Compact", 50);
        expect(price).toBe("$150");
    });

    test('50-year-old driver rents a car for Thursday, Friday, Saturday', () => {
        const price = rental.price(Date.parse("2025-02-13"), Date.parse("2025-02-15"), "Compact", 50);
        expect(price).toBe("$152.5");
    });

    test('should correctly calculate mixed weekday and weekend pricing', () => {
        const price = rental.price(Date.parse("2025-02-12"), Date.parse("2025-02-15"), "Compact", 50);
        expect(price).toBe("$202.5"); // 2 weekdays ($100) + 2 weekend days ($105)
    });

    
});