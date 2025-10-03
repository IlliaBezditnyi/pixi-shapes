export namespace GameConfig {
    export class Canvas {
        public static width: number = 1190;
        public static height: number = 740;
    }

    export class Physics {
        private static _gravity: number = 100;
        public static readonly minGravity: number = 0;
        public static readonly maxGravity: number = 500;
        public static readonly gravityStep: number = 50;

        public static get gravity(): number {
            return this._gravity;
        }

        public static set gravity(value: number) {
            this._gravity = Math.max(this.minGravity, Math.min(this.maxGravity, value));
        }

        public static increaseGravity(): void {
            this.gravity += this.gravityStep;
        }

        public static decreaseGravity(): void {
            this.gravity -= this.gravityStep;
        }
    }

    export class Spawn {
        private static _shapesPerSecond: number = 1;
        public static readonly minShapesPerSecond: number = 0;
        public static readonly maxShapesPerSecond: number = 10;
        public static readonly shapesPerSecondStep: number = 1;

        public static get shapesPerSecond(): number {
            return this._shapesPerSecond;
        }

        public static set shapesPerSecond(value: number) {
            this._shapesPerSecond = Math.max(
                this.minShapesPerSecond,
                Math.min(this.maxShapesPerSecond, value)
            );
        }

        public static increaseSpawnRate(): void {
            this.shapesPerSecond += this.shapesPerSecondStep;
        }

        public static decreaseSpawnRate(): void {
            this.shapesPerSecond -= this.shapesPerSecondStep;
        }
    }

    export class Shapes {
        public static readonly minSize: number = 30;
        public static readonly maxSize: number = 80;
        
        public static readonly triangle: string = 'TRIANGLE';
        public static readonly square: string = 'SQUARE';
        public static readonly pentagon: string = 'PENTAGON';
        public static readonly hexagon: string = 'HEXAGON';
        public static readonly circle: string = 'CIRCLE';
        public static readonly ellipse: string = 'ELLIPSE';
    }
}