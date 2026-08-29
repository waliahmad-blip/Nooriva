'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/**
 * NoorixHologram — Cinematic AI intelligence boot sequence
 *
 * - Wireframe icosahedron mesh (3D rotating geometry)
 * - Data stream particles (Matrix-style)
 * - Scanning grid + moving beam
 * - Energy pulse rings
 * - Progress bar with percentage
 * - System status messages
 * - Glitch/flicker effects
 * - Projection base platform
 * - 8-second boot sequence
 */

function WireframeMesh({ size }) {
  var canvasRef = useRef(null);

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var cx = size / 2;
    var cy = size / 2;
    var radius = size * 0.32;
    var angleX = 0, angleY = 0, angleZ = 0;
    var raf;

    var t = (1 + Math.sqrt(5)) / 2;
    var vertices = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, -1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ].map(function(v) {
      var len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      return [v[0]/len, v[1]/len, v[2]/len];
    });

    var edges = [
      [0,1],[0,5],[0,11],[0,7],[0,10],[1,5],[1,9],[1,7],[1,8],
      [2,3],[2,4],[2,11],[2,6],[2,10],[3,4],[3,9],[3,6],[3,8],
      [4,5],[4,11],[4,9],[5,11],[5,9],[6,7],[6,10],[6,8],[7,10],[7,8],[8,9],[10,11]
    ];

    function project(x, y, z) {
      var y1 = y * Math.cos(angleX) - z * Math.sin(angleX);
      var z1 = y * Math.sin(angleX) + z * Math.cos(angleX);
      var x2 = x * Math.cos(angleY) + z1 * Math.sin(angleY);
      var z2 = -x * Math.sin(angleY) + z1 * Math.cos(angleY);
      var x3 = x2 * Math.cos(angleZ) - y1 * Math.sin(angleZ);
      var y3 = x2 * Math.sin(angleZ) + y1 * Math.cos(angleZ);
      var scale = 1 + z2 * 0.3;
      return { x: cx + x3 * radius * scale, y: cy + y3 * radius * scale, z: z2 };
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);
      angleX += 0.004;
      angleY += 0.006;
      angleZ += 0.002;

      for (var i = 0; i < edges.length; i++) {
        var a = vertices[edges[i][0]];
        var b = vertices[edges[i][1]];
        var pa = project(a[0], a[1], a[2]);
        var pb = project(b[0], b[1], b[2]);
        var avgZ = (pa.z + pb.z) / 2;
        var alpha = 0.15 + (avgZ + 1) * 0.25;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = 'rgba(103, 232, 249, ' + alpha + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (var j = 0; j < vertices.length; j++) {
        var p = project(vertices[j][0], vertices[j][1], vertices[j][2]);
        var va = 0.3 + (p.z + 1) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167, 139, 250, ' + va + ')';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return function() { cancelAnimationFrame(raf); };
  }, [size]);

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ width: size, height: size }} />;
}

function DataStreams({ size }) {
  var canvasRef = useRef(null);

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var streams = [];
    for (var i = 0; i < 50; i++) {
      streams.push({
        x: Math.random() * size,
        y: Math.random() * size,
        speed: 0.3 + Math.random() * 1.5,
        length: 8 + Math.random() * 25,
        opacity: 0.08 + Math.random() * 0.25,
        char: String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)),
      });
    }

    var raf;
    function draw() {
      ctx.clearRect(0, 0, size, size);
      for (var i = 0; i < streams.length; i++) {
        var s = streams[i];
        s.y += s.speed;
        if (s.y > size + s.length) { s.y = -s.length; s.x = Math.random() * size; }
        if (Math.random() < 0.03) s.char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        ctx.font = '9px monospace';
        ctx.fillStyle = 'rgba(103, 232, 249, ' + s.opacity + ')';
        ctx.fillText(s.char, s.x, s.y);
        ctx.fillStyle = 'rgba(103, 232, 249, ' + (s.opacity * 0.2) + ')';
        ctx.fillText(s.char, s.x, s.y - s.length);
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return function() { cancelAnimationFrame(raf); };
  }, [size]);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-40" style={{ width: size, height: size }} />;
}

function ScanLines({ size }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: size, height: size }}>
      {Array.from({ length: 30 }).map(function(_, i) {
        return (
          <div key={i} className="absolute w-full" style={{
            top: i * (size / 30), height: 1,
            background: 'linear-gradient(90deg, transparent 0%, rgba(103,232,249,0.06) 20%, rgba(103,232,249,0.06) 80%, transparent 100%)',
          }} />
        );
      })}
      <div className="absolute w-full h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.4), transparent)',
        animation: 'hologram-scan-beam 3s linear infinite',
        boxShadow: '0 0 8px rgba(103,232,249,0.3)',
      }} />
    </div>
  );
}

function EnergyRings({ size }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0.6, 0.75, 0.9].map(function(scale, i) {
        return (
          <div key={i} className="absolute rounded-full border" style={{
            width: size * scale, height: size * scale,
            borderColor: 'rgba(103, 232, 249, ' + (0.08 + i * 0.04) + ')',
            animation: 'hologram-ring-pulse ' + (3 + i) + 's ease-in-out infinite',
            animationDelay: i * 0.5 + 's',
          }} />
        );
      })}
    </div>
  );
}

function ProjectionBase({ size }) {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: size * 0.8 }}>
      <div className="w-full h-3 rounded-full mx-auto" style={{
        background: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.15), rgba(167,139,250,0.15), transparent)',
        boxShadow: '0 0 30px rgba(103,232,249,0.1)',
      }} />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-px" style={{
        height: size * 0.4,
        background: 'linear-gradient(to top, rgba(103,232,249,0.2), transparent)',
      }} />
    </div>
  );
}

function ProgressBar({ progress, color }) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex justify-between text-[10px] font-mono mb-1.5" style={{ color: color + 'aa' }}>
        <span>LOADING</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, ' + color + ', ' + color + '80)', boxShadow: '0 0 8px ' + color + '60' }}
          initial={{ width: '0%' }}
          animate={{ width: progress + '%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function SystemLog({ logs, color }) {
  return (
    <div className="w-full max-w-sm mx-auto text-left">
      {logs.map(function(log, i) {
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2 text-[10px] font-mono py-0.5"
          >
            <span style={{ color: log.ok ? '#4ade80' : '#f87171' }}>{log.ok ? '✓' : '✗'}</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{log.time}</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{log.msg}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function NoorixHologram({ isVisible, onDismiss }) {
  var [progress, setProgress] = useState(0);
  var [phase, setPhase] = useState(0);
  var [logs, setLogs] = useState([]);

  var phases = [
    { label: 'Initializing neural core...', progress: 15, log: 'Neural core online', ok: true },
    { label: 'Loading health modules...', progress: 35, log: 'Health modules loaded (14)', ok: true },
    { label: 'Calibrating vision engine...', progress: 55, log: 'Vision engine calibrated', ok: true },
    { label: 'Connecting to wellness database...', progress: 75, log: 'Database connected', ok: true },
    { label: 'Loading AI models...', progress: 90, log: 'Noorix intelligence engine online', ok: true },
    { label: 'Noorix online.', progress: 100, log: 'System ready', ok: true },
  ];

  useEffect(function() {
    if (!isVisible) {
      setProgress(0);
      setPhase(0);
      setLogs([]);
      return;
    }

    var timers = [];
    phases.forEach(function(p, i) {
      timers.push(setTimeout(function() {
        setPhase(i);
        setProgress(p.progress);
        setLogs(function(prev) { return prev.concat([{ time: new Date().toLocaleTimeString(), msg: p.log, ok: p.ok }]); });
      }, i * 1200));
    });

    // Auto-dismiss after full boot
    timers.push(setTimeout(function() {
      if (onDismiss) onDismiss();
    }, phases.length * 1200 + 1500));

    return function() { timers.forEach(clearTimeout); };
  }, [isVisible]);

  var orbSize = 220;
  var currentPhase = phases[phase] || phases[0];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="hologram"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[80] flex items-center justify-center cursor-pointer"
          onClick={onDismiss}
          style={{ background: 'radial-gradient(ellipse at center, rgba(10,15,25,0.85) 0%, rgba(10,15,25,0.97) 100%)' }}
        >
          <div className="relative" style={{ width: orbSize, height: orbSize }}>
            {/* Ambient glow */}
            <div className="absolute rounded-full" style={{
              width: orbSize * 2.5, height: orbSize * 2.5,
              left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(103,232,249,0.06) 0%, rgba(167,139,250,0.03) 40%, transparent 70%)',
              filter: 'blur(50px)',
            }} />

            {/* Data streams */}
            <DataStreams size={orbSize} />

            {/* Scan lines */}
            <ScanLines size={orbSize} />

            {/* Energy rings */}
            <EnergyRings size={orbSize} />

            {/* Wireframe mesh */}
            <motion.div animate={{ scale: [0.95, 1.02, 0.95] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <WireframeMesh size={orbSize} />
            </motion.div>

            {/* Center glow */}
            <div className="absolute rounded-full" style={{
              width: 20, height: 20, left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(103,232,249,0.6), rgba(167,139,250,0.3), transparent)',
              boxShadow: '0 0 40px rgba(103,232,249,0.3), 0 0 80px rgba(167,139,250,0.15)',
              animation: 'hologram-center-pulse 2s ease-in-out infinite',
            }} />

            {/* Projection base */}
            <ProjectionBase size={orbSize} />
          </div>

          {/* Status text + progress */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md px-6 text-center">
            {/* Current status */}
            <motion.p
              key={currentPhase.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-mono tracking-wider mb-4"
              style={{ color: 'rgba(103,232,249,0.9)', textShadow: '0 0 12px rgba(103,232,249,0.4)' }}
            >
              {currentPhase.label}
            </motion.p>

            {/* Progress bar */}
            <ProgressBar progress={progress} color="#67e8f9" />

            {/* System log */}
            <div className="mt-4">
              <SystemLog logs={logs} color="#67e8f9" />
            </div>

            {/* Tap to skip */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-4 text-[10px] text-white/20 font-mono"
            >
              tap anywhere to skip
            </motion.p>
          </div>

          <style jsx>{'\n            @keyframes hologram-scan-beam {\n              0% { top: 0%; }\n              100% { top: 100%; }\n            }\n            @keyframes hologram-ring-pulse {\n              0%, 100% { transform: scale(1); opacity: 0.3; }\n              50% { transform: scale(1.05); opacity: 0.6; }\n            }\n            @keyframes hologram-center-pulse {\n              0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }\n              50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }\n            }\n          '}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
