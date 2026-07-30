"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Node,
  Edge,
  OnNodesChange
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MatchNode, { MatchNodeData } from "./MatchNode";
import GroupNode, { GroupNodeData } from "./GroupNode";
import { buildSampleSquad } from "@/data/mockTournament";

const nodeTypes = {
  matchNode: MatchNode,
  groupNode: GroupNode
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

// Flow coordinates spacing
const COLUMN_SPACING = 340;
const OFFSET_Y = 40;

export const INITIAL_BRACKET_NODES: Node[] = [
  // ================= CỘT 1: VÒNG BẢNG A & B (TRÁI) =================
  {
    id: "group-a",
    type: "groupNode",
    position: { x: 0, y: OFFSET_Y },
    data: {
      id: "group-a",
      groupName: "BẢNG A",
      teams: []
    }
  },
  {
    id: "group-b",
    type: "groupNode",
    position: { x: 0, y: OFFSET_Y + 310 },
    data: {
      id: "group-b",
      groupName: "BẢNG B",
      teams: []
    }
  },

  // ================= CỘT 2: BÁN KẾT 1 (TRÁI) =================
  {
    id: "sf-1",
    type: "matchNode",
    position: { x: COLUMN_SPACING, y: OFFSET_Y + 160 },
    data: {
      id: "sf-1",
      roundName: "BÁN KẾT 1 (NHẤT A vs NHẤT B)",
      home: null,
      away: null
    }
  },

  // ================= CỘT 3: TRANH VÔ ĐỊCH & HẠNG 3 (TRUNG TÂM) =================
  {
    id: "gf-1",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 2, y: OFFSET_Y + 60 },
    data: {
      id: "gf-1",
      roundName: "TRẬN CHUNG KẾT (GRAND FINAL)",
      home: null,
      away: null,
      isGrandFinal: true
    }
  },
  {
    id: "bf-1",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 2, y: OFFSET_Y + 280 },
    data: {
      id: "bf-1",
      roundName: "TRẬN TRANH HẠNG BA",
      home: null,
      away: null,
      isBronzeFinal: true
    }
  },

  // ================= CỘT 4: BÁN KẾT 2 (PHẢI) =================
  {
    id: "sf-2",
    type: "matchNode",
    position: { x: COLUMN_SPACING * 3, y: OFFSET_Y + 160 },
    data: {
      id: "sf-2",
      roundName: "BÁN KẾT 2 (NHẤT C vs NHẤT D)",
      home: null,
      away: null
    }
  },

  // ================= CỘT 5: VÒNG BẢNG C & D (PHẢI) =================
  {
    id: "group-c",
    type: "groupNode",
    position: { x: COLUMN_SPACING * 4, y: OFFSET_Y },
    data: {
      id: "group-c",
      groupName: "BẢNG C",
      teams: []
    }
  },
  {
    id: "group-d",
    type: "groupNode",
    position: { x: COLUMN_SPACING * 4, y: OFFSET_Y + 310 },
    data: {
      id: "group-d",
      groupName: "BẢNG D",
      teams: []
    }
  }
];

export const INITIAL_BRACKET_EDGES: Edge[] = [
  // Left Side Edges (Groups A, B -> SF1)
  {
    id: "e-group-a-sf-1",
    source: "group-a",
    sourceHandle: "source-right",
    target: "sf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#7C3AED", strokeWidth: 2.5 }
  },
  {
    id: "e-group-b-sf-1",
    source: "group-b",
    sourceHandle: "source-right",
    target: "sf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#7C3AED", strokeWidth: 2.5 }
  },

  // SF1 -> Grand Final & Bronze Final
  {
    id: "e-sf-1-gf-1",
    source: "sf-1",
    sourceHandle: "source-right",
    target: "gf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#A855F7", strokeWidth: 2.5 }
  },
  {
    id: "e-sf-1-bf-1",
    source: "sf-1",
    sourceHandle: "source-right",
    target: "bf-1",
    targetHandle: "target-left",
    type: "smoothstep",
    style: { stroke: "#D97706", strokeWidth: 1.5 }
  },

  // Right Side Edges (Groups C, D -> SF2)
  {
    id: "e-group-c-sf-2",
    source: "group-c",
    sourceHandle: "source-left",
    target: "sf-2",
    targetHandle: "target-right",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#7C3AED", strokeWidth: 2.5 }
  },
  {
    id: "e-group-d-sf-2",
    source: "group-d",
    sourceHandle: "source-left",
    target: "sf-2",
    targetHandle: "target-right",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#7C3AED", strokeWidth: 2.5 }
  },

  // SF2 -> Grand Final & Bronze Final
  {
    id: "e-sf-2-gf-1",
    source: "sf-2",
    sourceHandle: "source-left",
    target: "gf-1",
    targetHandle: "target-right",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#A855F7", strokeWidth: 2.5 }
  },
  {
    id: "e-sf-2-bf-1",
    source: "sf-2",
    sourceHandle: "source-left",
    target: "bf-1",
    targetHandle: "target-right",
    type: "smoothstep",
    style: { stroke: "#D97706", strokeWidth: 1.5 }
  }
];

interface ReactFlowBracketProps {
  nodes: Node[];
  onNodesChange: OnNodesChange;
  edges?: Edge[];
  registeredCount?: number;
  onSelectMatch?: (matchData: MatchNodeData) => void;
  onSelectGroup?: (groupData: GroupNodeData) => void;
}

export default function ReactFlowBracket({
  nodes,
  onNodesChange,
  edges = INITIAL_BRACKET_EDGES,
  onSelectMatch,
  onSelectGroup
}: ReactFlowBracketProps) {
  const formattedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onSelectMatch,
        onSelectGroup
      }
    }));
  }, [nodes, onSelectMatch, onSelectGroup]);

  return (
    <div className="relative w-full h-[780px] bg-[#070913] flex flex-col">
      {/* 5-Column World Cup Symmetric Header */}
      <div className="grid grid-cols-5 gap-2 px-6 py-3 bg-[#0D111E] border-b border-[#1A2032] text-center z-10 select-none text-[11px] font-black uppercase tracking-wider">
        <div className="text-purple-300">VÒNG BẢNG (A & B)</div>
        <div className="text-purple-400">BÁN KẾT 1</div>
        <div className="text-amber-400 font-extrabold text-xs">CHUNG KẾT & TRANH HẠNG 3</div>
        <div className="text-purple-400">BÁN KẾT 2</div>
        <div className="text-purple-300">VÒNG BẢNG (C & D)</div>
      </div>

      {/* React Flow Viewport Canvas */}
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={formattedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          onNodeClick={(_event, node) => {
            if (node.type === "groupNode") {
              onSelectGroup?.(node.data as unknown as GroupNodeData);
            } else {
              onSelectMatch?.(node.data as MatchNodeData);
            }
          }}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          panOnDrag={false}
          preventScrolling={false}
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