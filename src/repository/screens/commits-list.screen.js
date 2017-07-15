import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import { ViewContainer, IssueListItem, LoadingContainer } from 'components';

import { colors } from 'config';

import { connect } from 'react-redux';
import { getRepositoryCommits } from '../repository.action';

const mapStateToProps = state => ({
  repository: state.repository.repository
});

const mapDispatchToProps = dispatch => ({
  getRepositoryCommits: (url) => dispatch(getRepositoryCommits(url))
});

class CommitsList extends Component {
  props: {
    repository: Object,
    commits: Array,
    isPendingCommits: boolean,
    getRepositoryCommits: Function,
    navigation: Object
  };

  renderItem = ({ item }) => (
    <IssueListItem
      type={this.props.navigation.state.params.type}
      issue={item}
      navigation={this.props.navigation}
    />
  );
  getList = () => {
    const { commits } = this.props;

    return commits
  };
  render() {
    const {
      isPendingCommits
    } = this.props;

    return (
      <ViewContainer>

        {isPendingCommits &&
          <LoadingContainer
            animating={isPendingCommits}
            text={`Loading commits`}
            style={styles.marginSpacing}
          />}

        {this.getList().length > 0 &&
          <FlatList
            ref="commitsListRef"
            removeClippedSubviews={false}
            data={this.getList()}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />}

        {!isPendingCommits &&
          this.getList().length == 0 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.searchTitle}>
              There is no commit in this repo.
            </Text>
          </View>}
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1
  },
  list: {
    marginTop: 0
  },
  loadingIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginSpacing: {
    marginTop: 40
  }
});

export const CommitsListScreen = connect(mapStateToProps, mapDispatchToProps)(
  CommitsList
);
