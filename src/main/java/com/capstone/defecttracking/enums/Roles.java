package com.capstone.defecttracking.enums;

public enum Roles {

    USER {
        @Override
        public String toString() {
            return "USER";
        }
    },

    ADMIN {
        @Override
        public String toString() {
            return "ADMIN";
        }
    }
}
