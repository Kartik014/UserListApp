import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, Modal, ActivityIndicator } from "react-native";
import styles from "../Style/Styles";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [Page, setPage] = useState(1);

    useEffect(() => {
        fetchData(Page);
    }, [])

    const fetchData = async (pageNumber) => {
        try {
            setLoading(true)
            setRefreshing(false)
            const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}&delay=3`);
            const data = await response.json();
            setUsers((prevUsers) => [...prevUsers, ...data.data]);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data', error);
            setLoading(false)
            setRefreshing(false)
        }
    }

    const handleModalClick = (user) => {
        setSelectedUser(user);
        setDialogVisible(true);
    }

    const handleModalClose = () => {
        setSelectedUser(null);
        setDialogVisible(false);
    }

    const onEndReached = () => {
        const nextPage = Page + 1;
        setPage(nextPage)
        fetchData(nextPage)
    }

    const handleRefresh = () => {
        setRefreshing(true);
        const nextPage = Page + 1
        setPage(nextPage)
        fetchData(nextPage);
    }

    return (
        <View>
            {
                refreshing && users.length === 0 ? (
                    <View>
                        <ActivityIndicator size='large' color='white' />
                    </View>
                ) : null
            }
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleModalClick(item)}>
                        <View style={styles.UserMain}>
                            <View style={styles.wrapper}>
                                <Text style={styles.text}>{item.first_name} {item.last_name}</Text>
                            </View>
                            <Image source={{ uri: item.avatar }} style={styles.image} />
                        </View>
                    </TouchableOpacity>
                )}
                onEndReached={onEndReached}
                ListFooterComponent={() => {
                    return loading && users.length > 0 ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size='large' color='black' />
                        </View>
                    ) : null
                }}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>User Information</Text>
                        {selectedUser && (
                            <><View style={{ alignItems: 'center' }}>
                                <Image source={{ uri: selectedUser.avatar }} style={styles.modalImage} />
                            </View>
                                <View>
                                    <Text style={{ color: 'black' }}>Name: {selectedUser.first_name} {selectedUser.last_name}</Text>
                                    <Text style={{ color: 'black' }}>Id: {selectedUser.id}</Text>
                                </View></>
                        )}
                        <TouchableOpacity style={styles.modalCloseButton} onPress={() => handleModalClose()}>
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default UserList;