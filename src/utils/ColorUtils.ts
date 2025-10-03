export class ColorUtils {
  static getRandomColor(): number {
    return Math.floor(Math.random() * 0xFFFFFF);
  }

  static hexToNumber(hex: string): number {
    return parseInt(hex.replace('#', ''), 16);
  }

  static getRandomVibrantColor(): number {
    const colors = [
      0xFF6B6B, // Red
      0x4ECDC4, // Cyan
      0x45B7D1, // Blue
      0xF7DC6F, // Yellow
      0xBB8FCE, // Purple
      0x52C41A, // Green
      0xFF8C42, // Orange
      0xE91E63, // Pink
      0x00BCD4, // Teal
      0x9C27B0  // Violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
