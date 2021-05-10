export enum DIET {
    FLEX = 'Flexitarian',
    VEGETARIAN = 'Vegetarian',
    VEGAN = 'Vegan',
    OTHER = 'Other'
}

export enum OBJECTIVES {
    UP = 'Prendre du poids',
    DOWN = 'Perdre du poids',
    HEALTH_FOOD = 'Améliorer mon alimentation',
}

export interface SignUpInfos {
    objective: OBJECTIVES | null;
    height: number;
    weight: number;
    diet: DIET | null;
}
