precision mediump float;

uniform sampler2D uImage;
uniform float time;
uniform float speed;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;
uniform vec3 color5;
uniform vec3 color6;

varying vec2 vTexCoord;

void main() {
    // Sample the texture color at the current UV coordinate
    vec4 texColor = texture2D(uImage, vTexCoord);

    // Calculate brightness as the average of the RGB components
    float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;

    // Colors are now passed as uniforms from the controls

    // Calculate the time-based offset
    float timeOffset = mod(time * speed, 1.0);

    // Adjust brightness with time offset
    float adjustedBrightness = mod(brightness + timeOffset, 1.0);

    // Interpolate between colors based on adjusted brightness
    vec3 color;

  
    if (adjustedBrightness < 0.2) {
        color = mix(color1, color2, (adjustedBrightness-0.05) * 5.0);
    } else if (adjustedBrightness < 0.4) {
        color = mix(color2, color3, (adjustedBrightness - 0.2) * 5.0);
    } else if (adjustedBrightness < 0.6) {
        color = mix(color3, color4, (adjustedBrightness - 0.4) * 5.0);
    } else if (adjustedBrightness < 0.8) {
        color = mix(color4, color6, (adjustedBrightness - 0.6) * 5.0);
    } else if (adjustedBrightness < 0.85) {
        color = mix(color6, color5, (adjustedBrightness - 0.6) * 5.0);
    } else {
        color = mix(color5, color1, (adjustedBrightness - 0.8) * 5.0);
    }
    // Calculate alpha based on brightness
    // Almost white (brightness > 0.85) gets some opacity
    // Pure white (brightness > 0.95) becomes transparent
    float alpha;
    if (brightness > 0.95) {
        float r = ((brightness-0.95)*20.);
        // color = vec3(r, r, r);
        color = mix(color, vec3(0.0, 0.0, 0.0), r);
        alpha = 0.0; // Pure white = transparent
    } 


    // Output the final color with proper alpha
    gl_FragColor = vec4(color, 1.0);
}
