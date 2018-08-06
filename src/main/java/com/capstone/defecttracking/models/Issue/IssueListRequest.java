package com.capstone.defecttracking.models.Issue;

import java.util.ArrayList;

public class IssueListRequest {
    private int page;
    private int pageSize;
    private SortType sorted;
    private ArrayList<FilterType> filtered;

    public IssueListRequest(int page, int pageSize, SortType sorted, ArrayList<FilterType> filtered) {
        this.page = page;
        this.pageSize = pageSize;
        this.sorted = sorted;
        this.filtered = filtered;
    }

    public IssueListRequest() {
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public SortType getSorted() {
        return sorted;
    }

    public void setSorted(SortType sorted) {
        this.sorted = sorted;
    }

    public ArrayList<FilterType> getFiltered() {
        return filtered;
    }

    public void setFiltered(ArrayList<FilterType> filtered) {
        this.filtered = filtered;
    }
}
