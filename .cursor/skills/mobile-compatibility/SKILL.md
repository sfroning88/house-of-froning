# Designing to be Mobile Compatible

As a personal expression, it matters that everything in this `React` app can be viewed on a mobile phone with ease. This trickles down through how to design components, thinking about dynamic sizing, and keeping accessibility features in mind.

## Device Consideration

There's a couple helpful `hooks` and `constants` to assist this endeavor:

- `useMediaQuery` determines whether the viewing device is `mobile` or `desktop`
- `MOBILE_BREAKPOINT`, components can be dynamically adjusted on the fly
- `ResizeObserver` helps measure frame size for overlay positioning
- `Viewport Constraints` limit the possible size options

## Accessibility Features

So everyone can have similar experiences:

- Use dynamic `text sizing` depending on `mobile` or `desktop` devices
- Being smart with `color visiblity` when determining styles
- Every component has `scroll bars` to guarantee usability
