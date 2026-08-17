const originalUnsplashImage = "https://images.unsplash.com/photo-1636220409261-794e0464ca2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwZmx1aWR8ZW58MXx8fHwxNzc1ODQ1NzUzfDA&ixlib=rb-4.1.0&q=80";

export function kineticImage(width: 200 | 400 | 1080): string {
  return `${originalUnsplashImage}&w=${width}`;
}
