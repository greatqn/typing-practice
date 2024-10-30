export default function calculateAccuracy(text1: string, text2: string, errorCount: number): string {
  const totalCharacters: number = text1.length;
  const accuracy: number = Math.max(0, 100 - (errorCount / totalCharacters * 100));
  return accuracy.toFixed(2);
}
