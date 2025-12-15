export function cambiarValoresALower(req, res, next) {
    // Guardamos las funciones originales
    const originalJson = res.json;
    const originalSend = res.send;

    // Sobrescribir res.json
    res.json = function (data) {
        const lowered = convertValuesToLowercase(data);
        return originalJson.call(this, lowered);
    };

    // Sobrescribir res.send (solo strings)
    res.send = function (data) {
        if (typeof data === "string") {
            return originalSend.call(this, data.toLowerCase());
        }
        return originalSend.call(this, data);
    };

    next();
};

// Función recursiva que SOLO baja valores, no keys
export function convertValuesToLowercase(data) {
    if (typeof data === "string") {
        return data.toLowerCase();
    }

    if (Array.isArray(data)) {
        return data.map(item => convertValuesToLowercase(item));
    }

    if (typeof data === "object" && data !== null) {
        const newObj = {};
        for (let key in data) {
            newObj[key] = convertValuesToLowercase(data[key]);
        }
        return newObj;
    }

    return data; // números, booleanos, null
}
