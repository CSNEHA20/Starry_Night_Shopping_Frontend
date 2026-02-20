export const starVertexShader = `
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const starFragmentShader = `
  varying vec3 vColor;
  void main() {
    float r = distance( gl_PointCoord, vec2(0.5, 0.5) );
    if ( r > 0.5 ) discard;
    gl_FragColor = vec4( vColor, 1.0 );
  }
`;

export const deepSpaceVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

export const deepSpaceFragmentShader = `
  varying vec2 vUv;
  uniform float time;
  
  void main() {
    vec3 color = vec3(0.0, 0.0, 0.1); // Deep blue background
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    color += vec3(noise * 0.05); // Add subtle noise
    gl_FragColor = vec4(color, 1.0);
  }
`;
