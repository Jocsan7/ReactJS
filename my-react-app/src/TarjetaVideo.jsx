import { useEffect, useMemo, useRef, useState } from "react";

function extraerVideoId(url) {
  if (!url || typeof url !== "string") return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }

    const segmentos = parsed.pathname.split("/").filter(Boolean);
    const embedIndex = segmentos.findIndex((valor) => valor === "embed" || valor === "shorts");

    if (embedIndex !== -1 && segmentos[embedIndex + 1]) {
      return segmentos[embedIndex + 1];
    }
  } catch {
    return "";
  }

  return "";
}

function TarjetaVideo({ titulo, texto, videoUrl }) {
  const [enPreview, setEnPreview] = useState(false);
  const [thumbUrl, setThumbUrl] = useState("");
  const timeoutRef = useRef(null);
  const hoverDelayRef = useRef(null);

  const videoId = useMemo(() => extraerVideoId(videoUrl), [videoUrl]);

  useEffect(() => {
    if (!videoId) {
      setThumbUrl("");
      return;
    }

    setThumbUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
  }, [videoId]);

  const iframeUrl = useMemo(() => {
    if (!videoId) return "";
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1`;
  }, [videoId]);

  const limpiarTimers = () => {
    if (hoverDelayRef.current) {
      clearTimeout(hoverDelayRef.current);
      hoverDelayRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const detenerPreview = () => {
    limpiarTimers();
    setEnPreview(false);
  };

  const activarPreview = () => {
    if (!videoId) return;

    setEnPreview(true);
    timeoutRef.current = setTimeout(() => {
      setEnPreview(false);
      timeoutRef.current = null;
    }, 10000);
  };

  const iniciarPreview = () => {
    if (!videoId) return;

    detenerPreview();
    hoverDelayRef.current = setTimeout(() => {
      hoverDelayRef.current = null;
      activarPreview();
    }, 1200);
  };

  const abrirVideo = () => {
    if (!videoUrl) return;
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => () => detenerPreview(), []);

  return (
    <article
      className={`tarjeta tarjeta-video ${enPreview ? "is-previewing" : ""}`.trim()}
      onMouseEnter={iniciarPreview}
      onMouseLeave={detenerPreview}
      onFocus={iniciarPreview}
      onBlur={detenerPreview}
      onClick={abrirVideo}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          abrirVideo();
        }
      }}
    >
      <div className="tarjeta-video-media">
        {thumbUrl ? (
          <img
            className="tarjeta-video-thumb"
            src={thumbUrl}
            alt={titulo}
            loading="lazy"
            onError={() => {
              if (!videoId) return;
              setThumbUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
            }}
          />
        ) : (
          <div className="tarjeta-video-thumb tarjeta-video-thumb-fallback" aria-hidden="true" />
        )}

        <span className="tarjeta-video-play" aria-hidden="true" />

        {enPreview && iframeUrl && (
          <iframe
            className="tarjeta-video-iframe"
            title={`Preview de ${titulo}`}
            src={iframeUrl}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>

      <h3>{titulo}</h3>
      <p>{texto}</p>
      <a
        href={videoUrl}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        Ver video completo
      </a>
    </article>
  );
}

export default TarjetaVideo;
