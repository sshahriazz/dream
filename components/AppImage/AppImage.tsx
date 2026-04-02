"use client";

import NextImage from "next/image";
import type { ImageProps as NextImageProps } from "next/image";
import {
  Image as MantineImage,
  type ImageProps as MantineImageProps,
} from "@mantine/core";

type OmittedMantineProps = "src" | "onError" | "component";

export interface AppImageProps
  extends
    Omit<MantineImageProps, OmittedMantineProps>,
    Pick<
      NextImageProps,
      | "src"
      | "alt"
      | "quality"
      | "preload"
      | "loading"
      | "placeholder"
      | "blurDataURL"
      | "unoptimized"
      | "onError"
      | "onLoad"
      | "sizes"
      | "fill"
    > {
  /** Image width in pixels (required unless `fill` is true) */
  width?: number;
  /** Image height in pixels (required unless `fill` is true) */
  height?: number;
  ref?: React.Ref<HTMLImageElement>;
}

export function AppImage({
  src,
  alt,
  width,
  height,
  quality,
  preload,
  loading,
  placeholder,
  blurDataURL,
  unoptimized,
  onError,
  onLoad,
  sizes,
  fill,
  ref,
  ...rest
}: AppImageProps) {
  return (
    <MantineImage
      ref={ref}
      renderRoot={(props) => (
        <NextImage
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          quality={quality}
          preload={preload}
          loading={loading}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          unoptimized={unoptimized}
          onError={onError}
          onLoad={onLoad}
          sizes={sizes}
          fill={fill}
          {...props}
        />
      )}
      {...rest}
    />
  );
}
