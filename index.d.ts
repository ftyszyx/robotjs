export type Callback = (err: string) => void;

//other
export function setKeyboardDelay(ms: number): void;
export function setMouseDelay(delay: number): void;
export function getScreenSize(): { width: number; height: number };
export function updateScreenMetrics(): void;

//keyboard
export function keyTap(key: string, modifier?: string | string[]): void;
export function keyToggle(key: string, down: string, modifier?: string | string[]): void;
export function typeString(string: string): void;

//mouse
export function dragMouse(x: number, y: number, callback: Callback): void;
export function moveMouse(x: number, y: number): void;
export function moveMouseSmooth(x: number, y: number, speed?: number): void;
export function mouseClick(button?: string, double?: boolean): void;
export function mouseToggle(down?: string, button?: string): void;
export function getMousePos(): { x: number; y: number };
