package com.metlife.model;

public class Course implements Cloneable {
    private String name;
    private String category;
    private int price;
    private boolean availible;
    private int id;
    private static int initialId=0;

    public Course(String name, String category, int price, boolean availible) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.availible = availible;
        this.id=++initialId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public boolean isAvailible() {
        return availible;
    }

    public void setAvailible(boolean availible) {
        this.availible = availible;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Course{" +
                "name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", availible=" + availible +
                ", id=" + id +
                '}';
    }
}
