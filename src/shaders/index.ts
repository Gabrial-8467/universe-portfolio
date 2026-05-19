export const nebulaVertexShader = `
  uniform float uTime;
  uniform float uScale;
  
  varying vec2 vUv;
  varying float vHeight;
  
  void main() {
    vUv = uv;
    vHeight = position.z;
    
    vec3 pos = position;
    pos.x += sin(position.z * 0.1 + uTime * 0.5) * 0.5;
    pos.y += cos(position.x * 0.1 + uTime * 0.3) * 0.5;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos * uScale, 1.0);
  }
`;

export const nebulaFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  
  varying vec2 vUv;
  varying float vHeight;
  
  // Simple noise function
  float noise(vec2 uv, float t) {
    uv *= 3.0;
    float i = floor(uv.x);
    float j = floor(uv.y);
    float fi = fract(uv.x);
    float fj = fract(uv.y);
    
    fi = fi * fi * (3.0 - 2.0 * fi);
    fj = fj * fj * (3.0 - 2.0 * fj);
    
    float n0 = sin(i * 12.9898 + j * 78.233 + t) * 0.5 + 0.5;
    float n1 = sin(i * 12.9898 + (j + 1.0) * 78.233 + t) * 0.5 + 0.5;
    float nx0 = mix(n0, n1, fj);
    
    float n2 = sin((i + 1.0) * 12.9898 + j * 78.233 + t) * 0.5 + 0.5;
    float n3 = sin((i + 1.0) * 12.9898 + (j + 1.0) * 78.233 + t) * 0.5 + 0.5;
    float nx1 = mix(n2, n3, fj);
    
    return mix(nx0, nx1, fi);
  }
  
  void main() {
    vec2 uv = vUv;
    
    float n1 = noise(uv + uTime * 0.05, uTime * 0.1);
    float n2 = noise(uv * 2.0 - uTime * 0.03, uTime * 0.15);
    float n3 = noise(uv * 0.5 + uTime * 0.02, uTime * 0.08);
    
    float pattern = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    pattern = smoothstep(0.3, 0.7, pattern);
    
    float dist = length(uv - 0.5) * 2.0;
    float edge = smoothstep(1.0, 0.3, dist);
    
    float alpha = pattern * edge * 0.6;
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export const starfieldVertexShader = `
  varying float vSize;
  
  void main() {
    vSize = length(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = max(0.5, vSize * 2.0);
  }
`;

export const starfieldFragmentShader = `
  varying float vSize;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5, 0.5));
    if (dist > 0.5) discard;
    
    float falloff = 1.0 - dist * 2.0;
    gl_FragColor = vec4(1.0, 1.0, 1.0, falloff * 0.8);
  }
`;

export const particleVertexShader = `
  attribute float aVelocityX;
  attribute float aVelocityY;
  attribute float aVelocityZ;
  attribute float aLife;
  
  uniform float uTime;
  uniform float uDuration;
  
  varying float vAlpha;
  varying vec3 vColor;
  
  void main() {
    float life = aLife;
    float elapsed = mod(uTime, life);
    float t = elapsed / life;
    
    vAlpha = 1.0 - t;
    
    vec3 pos = position;
    pos.x += aVelocityX * elapsed;
    pos.y += aVelocityY * elapsed;
    pos.z += aVelocityZ * elapsed;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = mix(2.0, 0.1, t);
  }
`;

export const particleFragmentShader = `
  varying float vAlpha;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5, 0.5));
    if (dist > 0.5) discard;
    
    float falloff = 1.0 - dist * 2.0;
    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * falloff);
  }
`;

export const glowVertexShader = `
  uniform float uGlowScale;
  
  void main() {
    vec3 pos = position * (1.0 + uGlowScale);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const glowFragmentShader = `
  uniform vec3 uGlowColor;
  uniform float uGlowIntensity;
  
  void main() {
    vec3 color = uGlowColor * uGlowIntensity;
    gl_FragColor = vec4(color, 0.3);
  }
`;

export const warpVertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  
  varying float vWarp;
  
  void main() {
    vWarp = sin(uTime * 0.5) * uIntensity;
    vec3 pos = position + normal * vWarp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const warpFragmentShader = `
  uniform vec3 uWarpColor;
  varying float vWarp;
  
  void main() {
    float alpha = 0.3 + abs(vWarp) * 0.5;
    gl_FragColor = vec4(uWarpColor, alpha);
  }
`;
