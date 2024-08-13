export type Callback = (err: string) => void;

export function dragMouse(x: number, y: number, callback: Callback): void;

export function setKeyboardDelay(ms: number): void;
export function setMouseDelay(delay: number): void;

export function keyTap(key: string, modifier?: string | string[]): void;
export function keyToggle(key: string, down: string, modifier?: string | string[]): void;
export function unicodeTap(value: number): void;
export function typeString(string: string): void;
export function updateScreenMetrics(): void;
export function moveMouse(x: number, y: number): void;
export function moveMouseSmooth(x: number, y: number, speed?: number): void;
export function mouseClick(button?: string, double?: boolean): void;
export function mouseToggle(down?: string, button?: string): void;
export function getMousePos(): { x: number; y: number };
export function getScreenSize(): { width: number; height: number };
