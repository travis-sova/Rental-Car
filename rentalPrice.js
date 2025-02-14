
function price(pickupDate, dropoffDate, type, age, license) {
    const clazz = getClazz(type);
    const days = get_days(pickupDate, dropoffDate);
    const season = getSeason(pickupDate, dropoffDate);

    if (age < 18) {
        return "Driver too young - cannot quote the price";
    }

    if (license < 1) {
        return "Driver must hold a license for at least a year";
    }

    if (age <= 21 && clazz !== "Compact") {
        return "Drivers 21 y/o or less can only rent Compact vehicles";
    }

    let rentalprice = 0;
    let currentDate = new Date(pickupDate);

    for (let i = 0; i < days; i++) {
        let dailyPrice = age; // Base daily price is the driver's age

        if (isWeekend(currentDate)) {
            dailyPrice *= 1.05; // 5% increase on weekends
        }

        rentalprice += dailyPrice;
        currentDate.setDate(currentDate.getDate() + 1);
    }

    if (clazz === "Racer" && age <= 25 && season === "High") {
        rentalprice *= 1.5;
    }

    if (season === "High") {
        rentalprice *= 1.15;
    }

    if (days > 10 && season === "Low") {
        rentalprice *= 0.9;
    }

    var rentString = rentalprice.toString();

    return '$' + rentString;
}

function isWeekend(date) {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6;
}

function getClazz(type) {
    switch (type) {
        case "Compact":
            return "Compact";
        case "Electric":
            return "Electric";
        case "Cabrio":
            return "Cabrio";
        case "Racer":
            return "Racer";
        default:
            return "Unknown";
    }
}

function get_days(pickupDate, dropoffDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(pickupDate);
    const secondDate = new Date(dropoffDate);

    return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1;
}

function getSeason(pickupDate, dropoffDate) {
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    const start = 4;
    const end = 10;

    const pickupMonth = pickup.getMonth();
    const dropoffMonth = dropoff.getMonth();

    if (
        (pickupMonth >= start && pickupMonth <= end) ||
        (dropoffMonth >= start && dropoffMonth <= end) ||
        (pickupMonth < start && dropoffMonth > end)
    ) {
        return "High";
    } else {
        return "Low";
    }
}

exports.price = price;