// Type definitions for Ractive 0.4.0
// Project: http://ractivejs.org
// Adapted from the work of Han Lin Yap <http://yap.nu>: https://github.com/codler/Ractive-TypeScript-Definition
// Date: 2014-09-24


// DICTIONARIES: To be replaced later in the generated .fs file
interface NumberDic {
    [key: string]: number;
}

interface StringDic {
    [key: string]: string;
}

interface HTMLElementDic {
    [key: string]: HTMLElement;
}

interface RactiveEasingDic {
    [key: string]: (x: number)=>number;
}

interface RactiveAdaptorDic {
    [key: string]: RactiveAdaptor;
}

interface RactiveStaticDic {
    [key: string]: RactiveStatic;
}

interface RactiveParsedTemplateDic {
    [key: string]: RactiveParsedTemplate;
}

interface RactiveDecoratorPluginDic {
    [key: string]: (node: HTMLElement, arg: any) => RactiveTeardown;
}

interface RactiveEventPluginDic {
    [key: string]: (node: HTMLElement, fire: (ev: RactiveEvent) => any) => RactiveTeardown;
}

interface RactiveTransitionPluginDic {
    [key: string]: (t: RactiveTransition, arg: any) => void;
}
// ----------------------------------------------------------------------

// It's functionally identical to the ES6 promise (as currently spec'd) except that Promise.race and Promise.cast are not currently implemented.
interface RactivePromise {
    then(onFullfilled: (value: any) => any, onRejected: (reason: string) => any): RactivePromise; // TODO: 'reason' may actually be any value, change?
    catch(onRejected: (reason: string) => any): RactivePromise;
}

interface RactivePromiseStatic  {
    all(iterable: RactivePromise[]): RactivePromise;
    resolve(value: any): RactivePromise;
    reject(reason: string): RactivePromise;
}

interface RactiveAnimationPromise extends RactivePromise {
	stop(): void; // TODO: void?
}

interface RactiveTeardown {
    teardown: () => void;
}

interface RactiveParsedTemplate {
}

interface RactiveFindOptions {
    live: boolean;  // default false
}

interface RactiveMergeOptions {
    compare: any;   // TODO: Boolean or String or Function
}


interface RactiveAdaptor {
    filter: (object: any, keypath?: string, ractive?: Ractive) => boolean;
    wrap: (ractive: Ractive, object: any, keypath: string, prefixer: (object: any)=>any) => void;
}

interface RactiveEvent {
	context: any;       
    index: NumberDic;
	keypath: string;
	node: HTMLElement;
	original: Event;
}

// Return value in ractive.observe and ractive.on
interface RactiveObserve {
	cancel(): void;
}

// Comes as first parameter in RactiveTransitionPlugin
interface RactiveTransition {
	isIntro: boolean;
	name: string;
	node: HTMLElement;

	animateStyle(prop: string, value: any, options: RactiveTransitionAnimateOptions, complete: ()=>void): void;
	animateStyle(props: any, options: RactiveTransitionAnimateOptions, complete: ()=>void): void;
	// Default false
	complete(noReset?: boolean): void;
	getStyle(prop: string): string;
	getStyle(props: string[]): any;
	processParams(params: any, defaults?: any): any;
	resetStyle(): void;
	setStyle(prop: string, value: any): RactiveTransition;
	setStyle(props: any): RactiveTransition;
}

interface RactiveTransitionAnimateOptions {
	// TODO: Does it have default value?
	duration: number;
	// Any valid CSS timing function
	// Default 'linear'
	easing?: string;
	// TODO: Does it have default value?
	delay: number;
}

interface RactiveAnimateOptions {
	duration?: number;
	// TODO: String or Function
	easing?: any;
	// TODO: number as type correct?
	step?: (t: number, value: number) => void; // TODO: void?
	// TODO: number as type correct?
	complate?: (t: number, value: number) => void; // TODO: void?
}

interface RactiveObserveOptions {
	// Default Ractive
	context?: any;
	// Default false
	debug?: boolean;
	// Default false
	defer?: boolean;
	// Default true
	init?: boolean;
}

// Used in Ractive.parse options
interface RactiveParseOptions {
	preserveWhitespace: boolean;
	sanitize: any;
}

// Used in Initialisation options
interface RactiveSanitizeOptions {
	elements: string[];
	// TODO: Undocumented what default value is, but probably false
	eventAttributes?: boolean;
}

interface RactiveNewOptions {
    adapt?: RactiveAdaptor[];       // The array or hash could also contain strings referencing
    adaptors?: RactiveAdaptorDic;   // to adaptors registered in RactiveStatic.adaptors
	complete?: ()=>void;
    components?: RactiveStaticDic;
    computed?: StringDic;           // TODO: May also contain functions, but the compact syntax is much easier to use in FunScript
    css?: string;
    data?: any;                     
    decorators?: RactiveDecoratorPluginDic;
	/**
	 * @type HTMLElement or String or jQuery-like collection
	 */
	el?: string;
    events?: RactiveEventPluginDic;
    //interpolators?: any;
    partials?: StringDic;                       // TODO: May also be a RactiveParsedTemplateDic
	/**
	 * Default false
	 * @type Boolean or RactiveSanitizeOptions
	 */
    sanitize?: boolean;
    template?: string;                          // TODO: May also be a RactiveParsedTemplate
    transitions?: RactiveTransitionPluginDic;
    transitionsEnabled?: boolean;

	/**
	 * @type [open, close]
	 */
    delimiters?: string[];
    tripleDelimiters?: string[];
    staticDelimiters?: string[];
    staticTripleDelimiters?: string[];

	// Default false. It may also be an anchor, see docs
	append?: boolean;
	// Default false
    debug?: boolean;
	// Default false
	lazy?: boolean;
	// Default false
	magic?: boolean;
	// Default true
	modifyArrays?: boolean;
    // Default false
    noCssTransform?: boolean;
	// Default false
	noIntro?: boolean;
	// Default false
	preserveWhitespace?: boolean;
    // Default true
    stripComments?: boolean;
	// Default true
	twoway?: boolean;
}

interface RactiveExtendOptions extends RactiveNewOptions {
	// TODO: undocumented arguments
	beforeInit?: (options: RactiveExtendOptions) => void; // TODO: void?
	// TODO: undocumented arguments
	init?: (options: RactiveExtendOptions) => void; // TODO: void?
	// Default false, inherit from Ractive.defaults
	isolated?: boolean;
}

/**
 * Static members of Ractive
 */
interface RactiveStatic {
    new (options: RactiveNewOptions): Ractive;

    extend(options: RactiveExtendOptions): RactiveStatic;

    parse(template: string, options?: RactiveParseOptions): RactiveParsedTemplate;

    // TODO: undocumented
    adaptors: RactiveAdaptorDic;

    // TODO: undocumented
    components: RactiveStaticDic;

    defaults: RactiveNewOptions;

    // TODO: undocumented
    decorators: RactiveDecoratorPluginDic;

    easing: RactiveEasingDic;

    // TODO: undocumented
    events: RactiveEventPluginDic;

    // TODO: missing static properties documentation
    partials: RactiveParsedTemplateDic;

    // Undocumented method
    Promise: RactivePromiseStatic;

    // TODO: missing static properties documentation
    transitions: RactiveTransitionPluginDic;
}

/**
 * The Ractive instance members
 */
interface Ractive extends RactiveNewOptions {
	find(selector: string): HTMLElement;
    findComponent(name?: string): Ractive;
    findAll(selector: string, options?: RactiveFindOptions): HTMLElement[];
    findAllComponents(name: string, options?: RactiveFindOptions): Ractive[];

	observe(keypath: string, callback: (newValue: any, oldValue: any, keypath: string) => void, options?: RactiveObserveOptions): RactiveObserve;
    //observe(map: { [keypath: string]: (newValue: any, oldValue: any, keypath: string) => void }, options?: RactiveObserveOptions): RactiveObserve;
    on(eventName: string, handler: (event: RactiveEvent, arg: any) => void): RactiveObserve;
    //on(map: { [eventName: string]: (event: RactiveEvent, arg: any) => void }): RactiveObserve;
    off(eventName?: string, handler?: (event: RactiveEvent, arg: any) => void): void; // TODO: void?
    fire(eventName: string, arg: any): void; // TODO: void?

    get(keypath: string): any;      
    get(): any;                     

    set(keypath: string, value: any): RactivePromise;
    set(map: any): RactivePromise;
    reset(data?: any): RactivePromise;
    toggle(keypath: string): RactivePromise;
    add(keypath: string, number?: number): RactivePromise;

    update(keypath?: string): RactivePromise;
    updateModel(keypath?: string, cascade?: boolean): void; 	// Update out of sync two-way bindings, cascade defaults to false

    animate(keypath: string, value: any, options?: RactiveAnimateOptions): RactiveAnimationPromise;
    animate(map: any, options?: RactiveAnimateOptions): RactiveAnimationPromise;

    pop(keypath: string): RactivePromise;
    push(keypath: string, value: any): RactivePromise;   
    shift(keypath: string): RactivePromise;
    unshift(keypath: string, value: any): RactivePromise;
    splice(keypath: string, index: number, removeCount: number, ...args: any[]): RactivePromise;
    subtract(keypath: string, number?: number): RactivePromise;
    merge(keypath: string, value: any[], options?: RactiveMergeOptions): RactivePromise;

    // TODO: target - Node or String or jQuery (see Valid selectors)
    // TODO: anchor - Node or String or jQuery
    insert(target: any, anchor?: any): void;    // TODO: void?
	// render(target: any): void;               // Cannot be called directly
    teardown(): RactivePromise;
    detach(): DocumentFragment;
	toHTML(): string;

	// Properties
	nodes: HTMLElementDic;
	partials: StringDic;
    transitions: RactiveTransitionPluginDic;
}

declare module "ractive" {
	export = Ractive;
}
declare var Ractive: RactiveStatic;