import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Button, Text, ActivityIndicator } from "react-native-paper";
import api from "../../services/api";
import { Car } from "./types";

export default function MyCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cars.length > 0 ? (
        cars.map((car) => (
          <Card key={car.id} style={styles.card}>
            <Card.Content>
              <Text variant="headlineMedium">
                {car.manufacturer} {car.model}
              </Text>
              <Text>Current Kilometers: {car.currentKilometers}</Text>
            </Card.Content>
            <Card.Actions>
              <Button>Edit</Button>
            </Card.Actions>
          </Card>
        ))
      ) : (
        <Text>No cars found. Please add a new car.</Text>
      )}
      <Button mode="contained" style={styles.addButton}>
        Add New Car
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    marginBottom: 15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    marginTop: 20,
  },
});
