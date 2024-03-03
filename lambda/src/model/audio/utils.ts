export function buildAudioUrl(src: string) {
  return src + `?${Date.now()}`;
}
