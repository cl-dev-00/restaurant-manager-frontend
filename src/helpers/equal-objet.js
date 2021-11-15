const equalObjet = (objet1, objet2) => {

    const keys1 = Object.keys(objet1);
    const keys2 = Object.keys(objet2);

    if(keys1.length !== keys2.length) {
        return false;
    }

    for(const key of keys1) {
        if(objet1[key] !== objet2[key]) {
            return false;
        }
    }

    return true;
};

export default equalObjet;