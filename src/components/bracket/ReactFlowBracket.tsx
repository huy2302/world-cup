"use client";

import {
  ReactFlow,
  Background,
  Node,
  Edge,
  OnNodesChange
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MatchNode from "./MatchNode";

const nodeTypes = {
  matchNode: MatchNode
};

export const AVATARS = {
  huydev: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80",
  neuer: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  cyber: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
  blitz: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80",
  cr7: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  pep: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
  shadow: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  lm10: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80",
  striker: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  viper: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
  dragon: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  kaiser: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80"
};

// Điều chỉnh khoảng cách giữa các cột và hàng
const COLUMN_SPACING = 320; // Khoảng cách giữa các cột
const ROW_SPACING = 120; // Khoảng cách giữa các hàng
const OFFSET_Y = 40; // Dịch chuyển Y ban đầu

export const INITIAL_BRACKET_NODES: Node[] = [
  // ================= CỘT 1: VÒNG 16 (TRÁI) =================
  {
    id: "r16-1",
    type: "matchNode",
    position: { x: 0, y: OFFSET_Y },
    data: {
      home: { name: "Nguyễn Văn Huy", ign: "FCPro_HuyDev", avatar: AVATARS.huydev, teamName: "Tây Ban Nha", teamFlag: "https://flagcdn.com/w40/es.png", score: null },
      away: { name: "Trần Minh Neuer", ign: "Neuer_Wall", avatar: AVATARS.neuer, teamName: "Đức", teamFlag: "https://flagcdn.com/w40/de.png", score: null }
    }
  },
  {
    id: "r16-2",
    type: "matchNode",
    position: { x: 0, y: OFFSET_Y + ROW_SPACING * 1.5 },
    data: {
      home: { name: "Lê Hoàng Long", ign: "VN_CyberDragon", avatar: AVATARS.cyber, teamName: "Việt Nam", teamFlag: "https://flagcdn.com/w40/vn.png", score: null },
      away: { name: "Phạm Quốc Bảo", ign: "Blitz_R9", avatar: AVATARS.blitz, teamName: "Brazil", teamFlag: "https://flagcdn.com/w40/br.png", score: null }
    }
  },
  {
    id: "r16-3",
    type: "matchNode",
    position: { x: 0, y: OFFSET_Y + ROW_SPACING * 3.5 },
    data: {
      home: { name: "Đặng Tuấn Anh", ign: "CR7_KingGamer", avatar: AVATARS.cr7, teamName: "Bồ Đào Nha", teamFlag: "https://flagcdn.com/w40/pt.png", score: null },
      away: { name: "Ngô Pep Pro", ign: "Coach_PepPro", avatar: AVATARS.pep, teamName: "Tây Ban Nha", teamFlag: "https://flagcdn.com/w40/es.png", score: null }
    }
  },
  {
    id: "r16-4",
    type: "matchNode",
    position: { x: 0, y: OFFSET_Y + ROW_SPACING * 5 },
    data: {
      home: { name: "Vũ Shadow", ign: "Shadow_FC4", avatar: AVATARS.shadow, teamName: "Pháp", teamFlag: "https://flagcdn.com/w40/fr.png", score: null },
      away: { name: "Bùi Leo Messi", ign: "LM10_GOAT", avatar: AVATARS.lm10, teamName: "Argentina", teamFlag: "https://flagcdn.com/w40/ar.png", score: null }
    }
  },

  // ================= CỘT 2: TỨ KẾT (TRÁI) =================
  {
    id: "qf-1",
    type: "matchNode",
    position: { x: COLUMN_SPACING, y: OFFSET_Y + ROW_SPACING * 0.75 },
    data: { home: null, away: null }
  },
  {
    id: "qf-2",
    type: "matchNode",
    position: { x: COLUMN_SPACING, y: OFFSET_Y + ROW_SPACING * 4.25 },
    data: { home: null, away: null }
  },

  // ================= CỘT 3: BÁN KẾT (TRÁI) =================
  {
    id: "sf-1",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 2, y: OFFSET_Y + ROW_SPACING * 2.5 },
    data: { home: null, away: null }
  },

  // ================= CỘT 4: CHUNG KẾT (TRUNG TÂM) =================
  {
    id: "gf-1",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 3, y: OFFSET_Y + ROW_SPACING * 1.5 },
    data: { home: null, away: null, isGrandFinal: true }
  },
  {
    id: "bf-1",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 3, y: OFFSET_Y + ROW_SPACING * 3.5 },
    data: { home: null, away: null, isBronzeFinal: true }
  },

  // ================= CỘT 5: BÁN KẾT (PHẢI) =================
  {
    id: "sf-2",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 4, y: OFFSET_Y + ROW_SPACING * 2.5 },
    data: { home: null, away: null }
  },

  // ================= CỘT 6: TỨ KẾT (PHẢI) =================
  {
    id: "qf-3",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 5, y: OFFSET_Y + ROW_SPACING * 0.75 },
    data: { home: null, away: null }
  },
  {
    id: "qf-4",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 5, y: OFFSET_Y + ROW_SPACING * 4.25 },
    data: { home: null, away: null }
  },

  // ================= CỘT 7: VÒNG 16 (PHẢI) =================
  {
    id: "r16-5",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 6, y: OFFSET_Y },
    data: {
      home: { name: "Hoàng Cyber", ign: "CyberStriker", avatar: AVATARS.striker, teamName: "Anh", teamFlag: "https://flagcdn.com/w40/gb-eng.png", score: null },
      away: { name: "Phan Viper", ign: "ViperKing", avatar: AVATARS.viper, teamName: "Hà Lan", teamFlag: "https://flagcdn.com/w40/nl.png", score: null }
    }
  },
  {
    id: "r16-6",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 6, y: OFFSET_Y + ROW_SPACING * 1.5 },
    data: {
      home: { name: "Đỗ Dragon", ign: "DragonEye", avatar: AVATARS.dragon, teamName: "Nhật Bản", teamFlag: "https://flagcdn.com/w40/jp.png", score: null },
      away: { name: "Trịnh Kaiser", ign: "Kaiser_FC", avatar: AVATARS.kaiser, teamName: "Hàn Quốc", teamFlag: "https://flagcdn.com/w40/kr.png", score: null }
    }
  },
  {
    id: "r16-7",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 6, y: OFFSET_Y + ROW_SPACING * 3.5 },
    data: { home: null, away: null }
  },
  {
    id: "r16-8",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 6, y: OFFSET_Y + ROW_SPACING * 5 },
    data: { home: null, away: null }
  }
];

export const INITIAL_BRACKET_EDGES: Edge[] = [
  // Left Side Edges (Flow Left -> Right)
  {
    id: "e-r16-1-qf-1",
    source: "r16-1",
    sourceHandle: "source-right",
    target: "qf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-r16-2-qf-1",
    source: "r16-2",
    sourceHandle: "source-right",
    target: "qf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-r16-3-qf-2",
    source: "r16-3",
    sourceHandle: "source-right",
    target: "qf-2",
    targetHandle: "target-left",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-r16-4-qf-2",
    source: "r16-4",
    sourceHandle: "source-right",
    target: "qf-2",
    targetHandle: "target-left",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-qf-1-sf-1",
    source: "qf-1",
    sourceHandle: "source-right",
    target: "sf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-qf-2-sf-1",
    source: "qf-2",
    sourceHandle: "source-right",
    target: "sf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-sf-1-gf-1",
    source: "sf-1",
    sourceHandle: "source-right",
    target: "gf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    style: { stroke: "#6D28D9", strokeWidth: 2 }
  },

  // Right Side Edges (Flow Right -> Left)
  {
    id: "e-r16-5-qf-3",
    source: "r16-5",
    sourceHandle: "source-left",
    target: "qf-3",
    targetHandle: "target-right",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-r16-6-qf-3",
    source: "r16-6",
    sourceHandle: "source-left",
    target: "qf-3",
    targetHandle: "target-right",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-r16-7-qf-4",
    source: "r16-7",
    sourceHandle: "source-left",
    target: "qf-4",
    targetHandle: "target-right",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-r16-8-qf-4",
    source: "r16-8",
    sourceHandle: "source-left",
    target: "qf-4",
    targetHandle: "target-right",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-qf-3-sf-2",
    source: "qf-3",
    sourceHandle: "source-left",
    target: "sf-2",
    targetHandle: "target-right",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-qf-4-sf-2",
    source: "qf-4",
    sourceHandle: "source-left",
    target: "sf-2",
    targetHandle: "target-right",
    type: "smoothstep",
    style: { stroke: "#334155", strokeWidth: 1.5 }
  },
  {
    id: "e-sf-2-gf-1",
    source: "sf-2",
    sourceHandle: "source-left",
    target: "gf-1",
    targetHandle: "target-right",
    type: "smoothstep",
    style: { stroke: "#6D28D9", strokeWidth: 2 }
  },
];

interface ReactFlowBracketProps {
  nodes: Node[];
  onNodesChange: OnNodesChange;
  edges?: Edge[];
  registeredCount?: number;
}

export default function ReactFlowBracket({
  nodes,
  onNodesChange,
  edges = INITIAL_BRACKET_EDGES,
  registeredCount = 12
}: ReactFlowBracketProps) {
  return (
    <div className="relative w-full h-[780px] bg-[#070913] flex flex-col">

      {/* 7-Column World Cup Symmetric Header */}
      <div className="grid grid-cols-7 gap-2 px-6 py-3 bg-[#0D111E] border-b border-[#1A2032] text-center z-10 select-none text-[11px] font-black uppercase tracking-wider">
        <div className="text-slate-300">VÒNG 16 (TRÁI)</div>
        <div className="text-slate-400">TỨ KẾT</div>
        <div className="text-purple-300">BÁN KẾT</div>
        <div className="text-amber-400 font-extrabold text-xs">CHUNG KẾT</div>
        <div className="text-purple-300">BÁN KẾT</div>
        <div className="text-slate-400">TỨ KẾT</div>
        <div className="text-slate-300">VÒNG 16 (PHẢI)</div>
      </div>

      {/* React Flow Viewport Canvas */}
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          panOnDrag={false}
          preventScrolling={true}
          fitView
          fitViewOptions={{ padding: 0.05 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#161B2E" gap={30} size={1} />
        </ReactFlow>
      </div>

    </div>
  );
}