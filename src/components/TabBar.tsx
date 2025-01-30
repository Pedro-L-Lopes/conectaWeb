"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { motion } from "framer-motion";

const TabBar = () => {
  const pathname = usePathname();

  const tabVariants = {
    active: { scale: 1.1, color: "#3b82f6" }, // Azul 500
    inactive: { scale: 1, color: "#6b7280" }, // Cinza 500
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md">
      <div className="flex justify-around items-center py-2">
        {/* Botão Início */}
        <Link href="/">
          <motion.div
            className="flex flex-col items-center"
            variants={tabVariants}
            initial="inactive"
            animate={pathname === "/" ? "active" : "inactive"}
            whileTap={{ scale: 0.9 }}
          >
            <AiOutlineHome size={24} />
            <span className="text-sm">Início</span>
          </motion.div>
        </Link>

        {/* Botão Favoritos */}
        <Link href="/favorites">
          <motion.div
            className="flex flex-col items-center"
            variants={tabVariants}
            initial="inactive"
            animate={pathname === "/favorites" ? "active" : "inactive"}
            whileTap={{ scale: 0.9 }}
          >
            <AiOutlineHeart size={24} />
            <span className="text-sm">Favoritos</span>
          </motion.div>
        </Link>

        {/* Botão Perfil */}
        <Link href="/profile">
          <motion.div
            className="flex flex-col items-center"
            variants={tabVariants}
            initial="inactive"
            animate={pathname === "/profile" ? "active" : "inactive"}
            whileTap={{ scale: 0.9 }}
          >
            <AiOutlineUser size={24} />
            <span className="text-sm">Perfil</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default TabBar;
