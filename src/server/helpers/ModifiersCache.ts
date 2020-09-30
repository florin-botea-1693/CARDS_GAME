export default class ModifiersCache
{
    public static modifiers:M = {
        before: [],
        after: []
    }
}

interface M {
    before: Array<IModifier.SelfModifier|IModifier.SceneModifier>;
    after: Array<IModifier.SelfModifier|IModifier.SceneModifier>;
}