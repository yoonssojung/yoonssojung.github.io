// Vertex attributes provided by p5.js
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// Varying variable to pass texture coordinates to the fragment shader
varying vec2 vTexCoord;

void main() {
  // Pass the texture coordinates to the fragment shader
  vTexCoord = aTexCoord;

  // Convert the position to a vec4 with a w component of 1.0
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Transform the position from [0,1] to [-1,1] range
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // Set the position for the vertex
  gl_Position = positionVec4;
}